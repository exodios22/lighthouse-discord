<#
  Lighthouse Tune-up for Discord (Windows)

  What it does:
    1. Replaces Discord's start-up layer (resources\app.asar) with OpenAsar, an open-source
       rewrite that starts Discord faster and runs Chromium with performance flags.
       Your original file is kept as app.asar.original. BetterDiscord keeps working.
    2. Tells Windows to run Discord on your high-performance graphics card.
    3. Optionally deletes old Discord versions that Discord leaves behind.

  Run it:      right-click > Run with PowerShell
  Undo it:     powershell -ExecutionPolicy Bypass -File Lighthouse-Tuneup.ps1 -Undo
  Re-run it after Discord installs a big update (a new app-1.0.xxxx folder) to re-apply.

  OpenAsar: https://github.com/GooseMod/OpenAsar (AGPL-3.0, by GooseMod / CanadaHonk)
#>
param([switch]$Undo, [switch]$Yes)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$OpenAsarUrl = 'https://github.com/GooseMod/OpenAsar/releases/download/nightly/app.asar'
$Root        = Join-Path $env:LOCALAPPDATA 'Discord'
$SettingsDir = Join-Path $env:APPDATA 'discord'
$GpuKey      = 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences'

function Say($text, $colour = 'Gray') { Write-Host $text -ForegroundColor $colour }
function Ask($question) {
    if ($Yes) { return $true }
    $a = Read-Host "$question [y/N]"
    return $a -match '^(y|yes)$'
}
function Write-Utf8NoBom($path, $text) {
    [IO.File]::WriteAllText($path, $text, (New-Object Text.UTF8Encoding $false))
}

Say ''
Say '  Lighthouse Tune-up for Discord' 'Yellow'
Say '  ------------------------------' 'Yellow'

if (-not (Test-Path $Root)) { Say "Couldn't find Discord in $Root. Is it installed for this Windows user?" 'Red'; exit 1 }

$apps = Get-ChildItem $Root -Directory -Filter 'app-*' |
        Sort-Object { [version]($_.Name -replace '^app-', '') } -Descending
if (-not $apps) { Say "Couldn't find any app-* folder in $Root." 'Red'; exit 1 }
$current = $apps[0]
$asar    = Join-Path $current.FullName 'resources\app.asar'
$backup  = Join-Path $current.FullName 'resources\app.asar.original'
$exe     = Join-Path $current.FullName 'Discord.exe'
Say "Discord version: $($current.Name)"

$running = Get-Process -Name 'Discord' -ErrorAction SilentlyContinue
if ($running) {
    Say ''
    Say 'Discord needs to close for this. If you are in a call or stage, you will be disconnected.' 'Yellow'
    if (-not (Ask 'Close Discord now?')) { Say 'Nothing changed.'; exit 0 }
    $running | Stop-Process -Force
    Start-Sleep -Seconds 2
}

if ($Undo) {
    if (Test-Path $backup) {
        Copy-Item $backup $asar -Force
        Remove-Item $backup -Force
        Say 'Restored the original app.asar.' 'Green'
    } else {
        Say 'No backup found for this Discord version, so app.asar was left alone.' 'Yellow'
    }
    if (Test-Path $GpuKey) { Remove-ItemProperty -Path $GpuKey -Name $exe -ErrorAction SilentlyContinue }
    Say 'Removed the graphics card preference.' 'Green'
} else {
    # ---- 1. OpenAsar ----
    Say ''
    Say '1. Installing OpenAsar' 'Cyan'
    $tmp = Join-Path $env:TEMP 'openasar-app.asar'
    Invoke-WebRequest -Uri $OpenAsarUrl -OutFile $tmp -UseBasicParsing
    $size = (Get-Item $tmp).Length
    if ($size -lt 10KB -or $size -gt 5MB) { Say "The download looks wrong ($size bytes). Nothing changed." 'Red'; exit 1 }
    if (-not (Test-Path $backup)) {
        if ((Get-Item $asar).Length -lt 1MB) {
            Say '   app.asar is already small, so OpenAsar is probably installed already. Updating it.'
        } else {
            Copy-Item $asar $backup -Force
            Say '   Backed up the original as app.asar.original'
        }
    }
    Copy-Item $tmp $asar -Force
    Remove-Item $tmp -Force
    Say "   Installed OpenAsar ($([math]::Round($size / 1KB)) KB)" 'Green'

    # OpenAsar settings: performance flags, no tracking, faster DOM. Skip the first-run window.
    $settingsPath = Join-Path $SettingsDir 'settings.json'
    if (Test-Path $settingsPath) {
        Copy-Item $settingsPath "$settingsPath.lighthouse-backup" -Force
        $settings = Get-Content $settingsPath -Raw | ConvertFrom-Json
    } else {
        New-Item -ItemType Directory -Force -Path $SettingsDir | Out-Null
        $settings = [pscustomobject]@{}
    }
    $oa = [pscustomobject]@{ setup = $true; cmdPreset = 'perf'; noTrack = $true; domOptimizer = $true; autoupdate = $true }
    if ($settings.PSObject.Properties['openasar']) {
        foreach ($p in $oa.PSObject.Properties) {
            if ($settings.openasar.PSObject.Properties[$p.Name]) { $settings.openasar.($p.Name) = $p.Value }
            else { $settings.openasar | Add-Member -NotePropertyName $p.Name -NotePropertyValue $p.Value }
        }
    } else {
        $settings | Add-Member -NotePropertyName 'openasar' -NotePropertyValue $oa
    }
    Write-Utf8NoBom $settingsPath ($settings | ConvertTo-Json -Depth 20)
    Say '   Turned on OpenAsar performance mode' 'Green'

    # ---- 2. Graphics card ----
    Say ''
    Say '2. Graphics card' 'Cyan'
    if (-not (Test-Path $GpuKey)) { New-Item -Path $GpuKey -Force | Out-Null }
    Set-ItemProperty -Path $GpuKey -Name $exe -Value 'GpuPreference=2;'
    Say '   Windows will run Discord on your high-performance GPU' 'Green'

    # ---- 3. Old versions ----
    $old = $apps | Select-Object -Skip 1
    if ($old) {
        Say ''
        Say '3. Old Discord versions' 'Cyan'
        $mb = [math]::Round((($old | ForEach-Object { (Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum }) | Measure-Object -Sum).Sum / 1MB)
        Say "   Found $($old.Count) old version folder(s), about $mb MB: $($old.Name -join ', ')"
        if (Ask '   Delete them?') {
            $old | ForEach-Object { Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
            Say '   Deleted' 'Green'
        }
    }
}

Say ''
Say 'Starting Discord...' 'Cyan'
$update = Join-Path $Root 'Update.exe'
if (Test-Path $update) { Start-Process $update -ArgumentList '--processStart', 'Discord.exe' } else { Start-Process $exe }
Say 'Done.' 'Green'
if (-not $Undo) { Say 'Tip: OpenAsar adds an "OpenAsar" line at the bottom of Discord''s settings sidebar with more options.' }
Say ''
if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }
