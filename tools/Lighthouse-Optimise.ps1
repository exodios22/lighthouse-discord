<#
  Lighthouse Optimise: makes the Discord app itself faster on Windows.
  Built from reverse engineering Discord's desktop bootstrap (app 1.0.9269). No plugins, no OpenAsar,
  and Discord's program files are not modified: everything goes through Discord's own settings file and Windows.
  Every change is reversible with -Undo.

  What it changes (it asks before the optional ones):
    1. Discord's own hidden start-up settings, in %APPDATA%\discord\settings.json:
         DESKTOP_TTI_REMOVE_V8_CACHE_CLEAR = true      Discord normally deletes its compiled-code cache on every
                                                       start and recompiles its whole app. This keeps it.
         DESKTOP_TTI_REMOVE_SHADER_CACHE_CLEAR = true  Discord normally deletes its GPU shader cache on every start
                                                       (first-minute stutter). This keeps it.
         DESKTOP_PROCESS_POLLING_PERF = true           Cheaper game-detection scanning of running programs.
         debugLogging = false                          Voice engine stops writing debug logs during calls and stages.
         chromiumSwitches                              Discord's own list of engine switches, read at every start:
                                                       GPU rasterisation, zero-copy uploads, GPU blocklist override,
                                                       high-performance GPU.
    2. Optional: turns off Discord's main-process crash reporting (Sentry), using Discord's own off switch
       (environment variable ELECTRON_ENABLE_STACK_DUMPING=true). Removes its timers, session writes and uploads.
    3. Windows runs Discord on your high-performance graphics card.
    4. Windows stops power-throttling Discord in the background (needs administrator).
    5. Optional: above-normal CPU priority for Discord (needs administrator).
    6. Optional: clears Discord's web download cache if it has grown past 500 MB, and deletes old versions.

  Run it:   right-click > Run with PowerShell
  Undo it:  powershell -ExecutionPolicy Bypass -File Lighthouse-Optimise.ps1 -Undo
#>
param([switch]$Undo, [switch]$Yes)

$ErrorActionPreference = 'Stop'

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    $argList = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$PSCommandPath`"")
    if ($Undo) { $argList += '-Undo' }
    if ($Yes) { $argList += '-Yes' }
    try { Start-Process powershell -Verb RunAs -ArgumentList $argList; exit 0 }
    catch { Write-Host 'Administrator rights were declined. Steps 4 and 5 need them; the rest will still run.' -ForegroundColor Yellow }
}

$Root     = Join-Path $env:LOCALAPPDATA 'Discord'
$Data     = Join-Path $env:APPDATA 'discord'
$Settings = Join-Path $Data 'settings.json'
$State    = Join-Path $Data 'lighthouse-optimise.json'
$GpuKey   = 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences'
$IfeoKey  = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Discord.exe\PerfOptions'
$Tuning   = [ordered]@{
    DESKTOP_TTI_REMOVE_V8_CACHE_CLEAR     = $true
    DESKTOP_TTI_REMOVE_SHADER_CACHE_CLEAR = $true
    DESKTOP_PROCESS_POLLING_PERF          = $true
    debugLogging                          = $false
}
$Switches = @('enable-gpu-rasterization', 'enable-zero-copy', 'ignore-gpu-blocklist', 'force_high_performance_gpu')

function Say($t, $c = 'Gray') { Write-Host $t -ForegroundColor $c }
function Ask($q) { if ($Yes) { return $true }; return (Read-Host "$q [y/N]") -match '^(y|yes)$' }
function SizeMB($paths) {
    $sum = 0
    foreach ($p in $paths) { if (Test-Path $p) { $sum += (Get-ChildItem $p -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum } }
    return [math]::Round($sum / 1MB)
}
function Save-Json($path, $obj) { [IO.File]::WriteAllText($path, ($obj | ConvertTo-Json -Depth 20), (New-Object Text.UTF8Encoding $false)) }
function Has($obj, $name) { return $null -ne $obj.PSObject.Properties[$name] }
function SetProp($obj, $name, $value) {
    if (Has $obj $name) { $obj.$name = $value } else { $obj | Add-Member -NotePropertyName $name -NotePropertyValue $value }
}

Say ''
Say '  Lighthouse Optimise for Discord' 'Yellow'
Say '  -------------------------------' 'Yellow'
if (-not (Test-Path $Root)) { Say "Couldn't find Discord in $Root." 'Red'; exit 1 }
$apps = Get-ChildItem $Root -Directory -Filter 'app-*' | Sort-Object { [version]($_.Name -replace '^app-', '') } -Descending
$exe  = Join-Path $apps[0].FullName 'Discord.exe'
Say "Discord version: $($apps[0].Name)"

# Discord rewrites settings.json when it closes, so it has to be closed first.
$running = Get-Process -Name 'Discord' -ErrorAction SilentlyContinue
if ($running) {
    Say ''
    Say 'Discord needs to close for this. If you are in a call or stage, you will be disconnected.' 'Yellow'
    if (-not (Ask 'Close Discord now?')) { Say 'Nothing changed.'; if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }; exit 0 }
    $running | Stop-Process -Force
    Start-Sleep -Seconds 3
}

$settings = if (Test-Path $Settings) { Get-Content $Settings -Raw | ConvertFrom-Json } else { [pscustomobject]@{} }
$state = if (Test-Path $State) { Get-Content $State -Raw | ConvertFrom-Json } else { [pscustomobject]@{ previous = [pscustomobject]@{}; switchesAdded = @() } }

if ($Undo) {
    foreach ($k in $Tuning.Keys) {
        if (Has $state.previous $k) {
            $prev = $state.previous.$k
            if ($null -eq $prev) { $settings.PSObject.Properties.Remove($k) } else { SetProp $settings $k $prev }
        } else { $settings.PSObject.Properties.Remove($k) }
    }
    if ((Has $settings 'chromiumSwitches') -and $state.switchesAdded) {
        foreach ($s in $state.switchesAdded) { $settings.chromiumSwitches.PSObject.Properties.Remove($s) }
        if (-not $settings.chromiumSwitches.PSObject.Properties.Name) { $settings.PSObject.Properties.Remove('chromiumSwitches') }
    }
    Save-Json $Settings $settings
    Say 'Restored Discord''s start-up settings' 'Green'
    [Environment]::SetEnvironmentVariable('ELECTRON_ENABLE_STACK_DUMPING', $null, 'User')
    Say 'Crash reporting is back on' 'Green'
    if (Test-Path $GpuKey) { Remove-ItemProperty -Path $GpuKey -Name $exe -ErrorAction SilentlyContinue }
    Say 'Removed the graphics card preference' 'Green'
    if ($isAdmin) {
        & powercfg /powerthrottling reset /path "$exe" 2>$null | Out-Null
        if (Test-Path $IfeoKey) { Remove-Item (Split-Path $IfeoKey) -Recurse -Force }
        Say 'Removed the power throttling exception and CPU priority' 'Green'
    }
    if (Test-Path $State) { Remove-Item $State -Force }
} else {
    # 1. Discord's own start-up settings
    Say ''
    Say '1. Discord''s hidden start-up settings' 'Cyan'
    Copy-Item $Settings "$Settings.lighthouse-backup" -Force -ErrorAction SilentlyContinue
    foreach ($k in $Tuning.Keys) {
        if (-not (Has $state.previous $k)) { SetProp $state.previous $k $(if (Has $settings $k) { $settings.$k } else { $null }) }
        SetProp $settings $k $Tuning[$k]
        Say "   $k = $($Tuning[$k])" 'Green'
    }
    if ((Has $settings 'chromiumSwitches') -and ($settings.chromiumSwitches -is [array])) {
        $asObject = [pscustomobject]@{}
        foreach ($s in $settings.chromiumSwitches) { $asObject | Add-Member -NotePropertyName "$s" -NotePropertyValue $true -Force }
        $settings.chromiumSwitches = $asObject
    }
    if ((-not (Has $settings 'chromiumSwitches')) -or ($null -eq $settings.chromiumSwitches)) { SetProp $settings 'chromiumSwitches' ([pscustomobject]@{}) }
    $added = @($state.switchesAdded)
    foreach ($s in $Switches) {
        if (-not (Has $settings.chromiumSwitches $s)) { $settings.chromiumSwitches | Add-Member -NotePropertyName $s -NotePropertyValue $true; $added += $s }
    }
    $state.switchesAdded = @($added | Select-Object -Unique)
    Say "   chromiumSwitches: $($Switches -join ', ')" 'Green'
    Save-Json $Settings $settings

    # 2. Crash reporting
    Say ''
    Say '2. Crash reporting in Discord''s main process' 'Cyan'
    if (Ask '   Turn it off? (Discord won''t send crash reports from its main process)') {
        [Environment]::SetEnvironmentVariable('ELECTRON_ENABLE_STACK_DUMPING', 'true', 'User')
        Say '   Off' 'Green'
    }

    # 3. GPU
    Say ''
    Say '3. Graphics card' 'Cyan'
    if (-not (Test-Path $GpuKey)) { New-Item -Path $GpuKey -Force | Out-Null }
    Set-ItemProperty -Path $GpuKey -Name $exe -Value 'GpuPreference=2;'
    Say '   Discord runs on your high-performance GPU' 'Green'

    # 4 + 5. Power throttling and priority
    Say ''
    Say '4. Power throttling' 'Cyan'
    if ($isAdmin) {
        & powercfg /powerthrottling disable /path "$exe" 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) { Say '   Windows will no longer throttle Discord in the background' 'Green' } else { Say '   Not supported on this Windows version. Skipped.' 'Yellow' }
        Say ''
        Say '5. CPU priority' 'Cyan'
        if (Ask '   Give Discord above-normal CPU priority? (Smoother Discord; games keep their own priority)') {
            New-Item -Path $IfeoKey -Force | Out-Null
            New-ItemProperty -Path $IfeoKey -Name 'CpuPriorityClass' -PropertyType DWord -Value 6 -Force | Out-Null
            Say '   Done' 'Green'
        }
    } else { Say '   Needs administrator rights. Skipped steps 4 and 5.' 'Yellow' }

    # 6. Disk clean-up
    $web = @('Cache', 'Service Worker\CacheStorage') | ForEach-Object { Join-Path $Data $_ }
    $mb = SizeMB $web
    Say ''
    Say "6. Web download cache: $mb MB" 'Cyan'
    if ($mb -ge 500 -and (Ask '   Clear it? (Shader and code caches are kept)')) {
        foreach ($c in $web) { if (Test-Path $c) { Remove-Item $c -Recurse -Force -ErrorAction SilentlyContinue } }
        Say '   Cleared' 'Green'
    } elseif ($mb -lt 500) { Say '   Fine as it is.' }
    $old = $apps | Select-Object -Skip 1
    if ($old -and (Ask "   Delete $($old.Count) old Discord version folder(s)?")) {
        $old | ForEach-Object { Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
        Say '   Deleted' 'Green'
    }
    Save-Json $State $state
}

Say ''
$shortcut = @(
    (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Discord Inc\Discord.lnk'),
    (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Discord.lnk')
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($shortcut) {
    # Explorer starts Discord as you, not as administrator
    Start-Process explorer.exe -ArgumentList "`"$shortcut`""
    Say 'Done. Discord is starting. The first start rebuilds its caches; every start after that is faster.' 'Green'
} else {
    Say 'Done. Open Discord as usual. The first start rebuilds its caches; every start after that is faster.' 'Green'
}
Say ''
if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }
