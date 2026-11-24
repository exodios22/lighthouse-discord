<#
  Lighthouse Optimise: makes the Discord app itself run faster on Windows.
  No BetterDiscord plugins and no OpenAsar. Every change is reversible with -Undo.

  What it does (it asks before each one):
    1. Clears Discord's web cache and graphics shader caches if they've grown large. A bloated
       cache slows start-up and channel loading. (The code cache that speeds start-up is kept.)
    2. Deletes old Discord versions left on disk.
    3. Windows runs Discord on your high-performance graphics card.
    4. Windows stops "power throttling" Discord (the efficiency mode that slows background apps,
       which makes stages and calls stutter when Discord isn't the focused window).
    5. Discord gets "above normal" CPU priority, so it stays responsive while other apps are busy.
    6. Discord starts with faster browser-engine settings (GPU drawing, zero-copy) via its shortcuts.

  Run it:   right-click > Run with PowerShell. It asks for administrator rights for steps 4 and 5.
  Undo it:  powershell -ExecutionPolicy Bypass -File Lighthouse-Optimise.ps1 -Undo
  Re-run after Discord installs a big update (new app-1.0.xxxx folder): steps 3 and 4 are tied to the exe path.
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

$Root      = Join-Path $env:LOCALAPPDATA 'Discord'
$Data      = Join-Path $env:APPDATA 'discord'
$Update    = Join-Path $Root 'Update.exe'
$GpuKey    = 'HKCU:\Software\Microsoft\DirectX\UserGpuPreferences'
$IfeoKey   = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\Discord.exe\PerfOptions'
$RunKey    = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$State     = Join-Path $Data 'lighthouse-optimise.json'
$Flags     = '--enable-gpu-rasterization --enable-zero-copy --ignore-gpu-blocklist --enable-features=CanvasOopRasterization,EnableDrDc --disable-features=UseEcoQoSForBackgroundProcess,CalculateNativeWinOcclusion'
$Shortcuts = @(
    (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Discord Inc\Discord.lnk'),
    (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Discord.lnk'),
    (Join-Path $env:APPDATA 'Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar\Discord.lnk')
) | Where-Object { Test-Path $_ }

function Say($t, $c = 'Gray') { Write-Host $t -ForegroundColor $c }
function Ask($q) { if ($Yes) { return $true }; return (Read-Host "$q [y/N]") -match '^(y|yes)$' }
function SizeMB($paths) {
    $sum = 0
    foreach ($p in $paths) { if (Test-Path $p) { $sum += (Get-ChildItem $p -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum } }
    return [math]::Round($sum / 1MB)
}

Say ''
Say '  Lighthouse Optimise for Discord' 'Yellow'
Say '  -------------------------------' 'Yellow'
if (-not (Test-Path $Root)) { Say "Couldn't find Discord in $Root." 'Red'; exit 1 }
$apps = Get-ChildItem $Root -Directory -Filter 'app-*' | Sort-Object { [version]($_.Name -replace '^app-', '') } -Descending
$exe  = Join-Path $apps[0].FullName 'Discord.exe'
Say "Discord version: $($apps[0].Name)"

$saved = @{}
if (Test-Path $State) { (Get-Content $State -Raw | ConvertFrom-Json).PSObject.Properties | ForEach-Object { $saved[$_.Name] = $_.Value } }
$shell = New-Object -ComObject WScript.Shell

$running = Get-Process -Name 'Discord' -ErrorAction SilentlyContinue
if ($running) {
    Say ''
    Say 'Discord needs to close for this. If you are in a call or stage, you will be disconnected.' 'Yellow'
    if (-not (Ask 'Close Discord now?')) { Say 'Nothing changed.'; if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }; exit 0 }
    $running | Stop-Process -Force
    Start-Sleep -Seconds 2
}

if ($Undo) {
    if (Test-Path $GpuKey) { Remove-ItemProperty -Path $GpuKey -Name $exe -ErrorAction SilentlyContinue }
    Say 'Removed the graphics card preference' 'Green'
    if ($isAdmin) {
        & powercfg /powerthrottling reset /path "$exe" 2>$null | Out-Null
        Say 'Removed the power throttling exception' 'Green'
        if (Test-Path $IfeoKey) { Remove-Item (Split-Path $IfeoKey) -Recurse -Force }
        Say 'Removed the CPU priority setting' 'Green'
    }
    foreach ($path in $Shortcuts) {
        $lnk = $shell.CreateShortcut($path)
        $lnk.Arguments = if ($saved.ContainsKey($path)) { $saved[$path] } else { '--processStart Discord.exe' }
        $lnk.Save()
    }
    if ($saved.ContainsKey('run')) { Set-ItemProperty -Path $RunKey -Name 'Discord' -Value $saved['run'] }
    Say 'Restored your Discord shortcuts' 'Green'
    if (Test-Path $State) { Remove-Item $State -Force }
} else {
    # 1. Caches
    $caches = @('Cache', 'GPUCache', 'DawnCache', 'DawnGraphiteCache', 'DawnWebGPUCache', 'Service Worker\CacheStorage') | ForEach-Object { Join-Path $Data $_ }
    $mb = SizeMB $caches
    Say ''
    Say "1. Web and shader caches: $mb MB" 'Cyan'
    if ($mb -lt 200) { Say '   Small enough. Skipped.' }
    elseif (Ask "   Clear them? (Discord rebuilds them; the first start afterwards is a little slower)") {
        foreach ($c in $caches) { if (Test-Path $c) { Remove-Item $c -Recurse -Force -ErrorAction SilentlyContinue } }
        Say '   Cleared' 'Green'
    }

    # 2. Old versions
    $old = $apps | Select-Object -Skip 1
    Say ''
    Say "2. Old Discord versions: $($old.Count)" 'Cyan'
    if ($old -and (Ask "   Delete $($old.Count) old version folder(s), about $(SizeMB ($old.FullName)) MB?")) {
        $old | ForEach-Object { Remove-Item $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
        Say '   Deleted' 'Green'
    }

    # 3. GPU
    Say ''
    Say '3. Graphics card' 'Cyan'
    if (-not (Test-Path $GpuKey)) { New-Item -Path $GpuKey -Force | Out-Null }
    Set-ItemProperty -Path $GpuKey -Name $exe -Value 'GpuPreference=2;'
    Say '   Discord now runs on your high-performance GPU' 'Green'

    # 4 + 5. Power throttling and priority
    Say ''
    Say '4. Power throttling' 'Cyan'
    if ($isAdmin) {
        & powercfg /powerthrottling disable /path "$exe" 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) { Say '   Windows will no longer throttle Discord in the background' 'Green' } else { Say '   This Windows version does not support it. Skipped.' 'Yellow' }
        Say ''
        Say '5. CPU priority' 'Cyan'
        if (Ask '   Give Discord above-normal CPU priority? (Smoother Discord; games keep their own priority)') {
            New-Item -Path $IfeoKey -Force | Out-Null
            New-ItemProperty -Path $IfeoKey -Name 'CpuPriorityClass' -PropertyType DWord -Value 6 -Force | Out-Null
            Say '   Done' 'Green'
        }
    } else { Say '   Needs administrator rights. Skipped steps 4 and 5.' 'Yellow' }

    # 6. Launch settings
    Say ''
    Say '6. Faster browser-engine settings at launch' 'Cyan'
    foreach ($path in $Shortcuts) {
        $lnk = $shell.CreateShortcut($path)
        if (-not $saved.ContainsKey($path) -and $lnk.Arguments -notmatch 'process-start-args') { $saved[$path] = $lnk.Arguments }
        $lnk.TargetPath = $Update
        $lnk.Arguments = "--processStart Discord.exe --process-start-args `"$Flags`""
        $lnk.Save()
    }
    $run = (Get-ItemProperty -Path $RunKey -Name 'Discord' -ErrorAction SilentlyContinue).Discord
    if ($run) {
        if (-not $saved.ContainsKey('run') -and $run -notmatch 'process-start-args') { $saved['run'] = $run }
        $min = if ($run -match '--start-minimized') { ' --start-minimized' } else { '' }
        Set-ItemProperty -Path $RunKey -Name 'Discord' -Value "`"$Update`" --processStart Discord.exe --process-start-args `"$Flags$min`""
    }
    Say "   Updated $($Shortcuts.Count) shortcut(s)$(if ($run) { ' and the start-with-Windows entry' })" 'Green'
    New-Item -ItemType Directory -Force -Path $Data | Out-Null
    [IO.File]::WriteAllText($State, ($saved | ConvertTo-Json), (New-Object Text.UTF8Encoding $false))
}

Say ''
$launch = $Shortcuts | Select-Object -First 1
if ($launch) {
    # Open through Explorer so Discord runs as you, not as administrator
    Say 'Starting Discord...' 'Cyan'
    Start-Process explorer.exe -ArgumentList "`"$launch`""
    Say 'Done. Open Discord from its shortcut from now on so the launch settings are used.' 'Green'
} else {
    Say 'Done. Open Discord from the Start menu as usual.' 'Green'
}
Say ''
if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }
