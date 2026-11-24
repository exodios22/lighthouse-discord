<#
  Lighthouse Launch Boost for Discord (Windows)

  Starts Discord with faster settings for its built-in browser engine (Chromium), by adding
  launch switches to your Discord shortcuts and to Discord's "start with Windows" entry.
  Nothing inside Discord's install folder is changed, and OpenAsar is not used.

  What the switches do:
    - Draw the window on your graphics card (GPU rasterisation, zero-copy uploads, out-of-process canvas,
      a separate GPU thread for display). Smoother scrolling, channel switching and video tiles.
    - Use the GPU even if Chromium has it on a cautious "blocklist".
    - Keep stages and calls smooth while Discord is behind other windows (stops Windows "efficiency mode"
      throttling Discord's video). Use -Light to leave this out if you'd rather save CPU in the background.

  Run it:      right-click > Run with PowerShell
  Undo it:     powershell -ExecutionPolicy Bypass -File Lighthouse-Launch.ps1 -Undo
#>
param([switch]$Undo, [switch]$Light, [switch]$Yes)

$ErrorActionPreference = 'Stop'

$Flags = @(
    '--enable-gpu-rasterization',
    '--enable-zero-copy',
    '--ignore-gpu-blocklist',
    '--enable-features=CanvasOopRasterization,EnableDrDc'
)
if (-not $Light) {
    $Flags += '--disable-features=UseEcoQoSForBackgroundProcess,CalculateNativeWinOcclusion'
}
$FlagText = $Flags -join ' '

$Root     = Join-Path $env:LOCALAPPDATA 'Discord'
$Update   = Join-Path $Root 'Update.exe'
$State    = Join-Path $env:APPDATA 'discord\lighthouse-launch.json'
$RunKey   = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$Shortcuts = @(
    (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Discord Inc\Discord.lnk'),
    (Join-Path ([Environment]::GetFolderPath('Desktop')) 'Discord.lnk'),
    (Join-Path $env:APPDATA 'Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar\Discord.lnk')
) | Where-Object { Test-Path $_ }

function Say($text, $colour = 'Gray') { Write-Host $text -ForegroundColor $colour }
function Ask($q) { if ($Yes) { return $true }; return (Read-Host "$q [y/N]") -match '^(y|yes)$' }
function BoostedArgs { "--processStart Discord.exe --process-start-args `"$FlagText`"" }

Say ''
Say '  Lighthouse Launch Boost for Discord' 'Yellow'
Say '  -----------------------------------' 'Yellow'
if (-not (Test-Path $Update)) { Say "Couldn't find Discord's Update.exe in $Root." 'Red'; exit 1 }

$shell = New-Object -ComObject WScript.Shell
$saved = @{}
if (Test-Path $State) { (Get-Content $State -Raw | ConvertFrom-Json).PSObject.Properties | ForEach-Object { $saved[$_.Name] = $_.Value } }

if ($Undo) {
    foreach ($path in $Shortcuts) {
        $lnk = $shell.CreateShortcut($path)
        $lnk.Arguments = if ($saved.ContainsKey($path)) { $saved[$path] } else { '--processStart Discord.exe' }
        $lnk.Save()
        Say "Restored $([IO.Path]::GetFileName((Split-Path $path -Parent)))\Discord.lnk" 'Green'
    }
    if ($saved.ContainsKey('run')) { Set-ItemProperty -Path $RunKey -Name 'Discord' -Value $saved['run']; Say 'Restored the start-with-Windows entry' 'Green' }
    if (Test-Path $State) { Remove-Item $State -Force }
} else {
    Say "Switches: $FlagText"
    Say ''
    foreach ($path in $Shortcuts) {
        $lnk = $shell.CreateShortcut($path)
        if (-not $saved.ContainsKey($path) -and $lnk.Arguments -notmatch 'process-start-args') { $saved[$path] = $lnk.Arguments }
        $lnk.TargetPath = $Update
        $lnk.Arguments = BoostedArgs
        $lnk.Save()
        Say "Updated shortcut: $path" 'Green'
    }
    if (-not $Shortcuts) { Say 'No Discord shortcuts found. Only the start-with-Windows entry will be changed.' 'Yellow' }
    $run = (Get-ItemProperty -Path $RunKey -Name 'Discord' -ErrorAction SilentlyContinue).Discord
    if ($run) {
        if (-not $saved.ContainsKey('run') -and $run -notmatch 'process-start-args') { $saved['run'] = $run }
        $startMin = if ($run -match '--start-minimized') { ' --start-minimized' } else { '' }
        Set-ItemProperty -Path $RunKey -Name 'Discord' -Value "`"$Update`" --processStart Discord.exe --process-start-args `"$FlagText$startMin`""
        Say 'Updated the start-with-Windows entry' 'Green'
    }
    New-Item -ItemType Directory -Force -Path (Split-Path $State) | Out-Null
    [IO.File]::WriteAllText($State, ($saved | ConvertTo-Json), (New-Object Text.UTF8Encoding $false))
}

Say ''
$running = Get-Process -Name 'Discord' -ErrorAction SilentlyContinue
if ($running) {
    Say 'The change takes effect the next time Discord starts.' 'Cyan'
    if (Ask 'Restart Discord now? (You will leave any call or stage you are in.)') {
        $running | Stop-Process -Force
        Start-Sleep -Seconds 2
        if ($Undo) { Start-Process $Update -ArgumentList '--processStart', 'Discord.exe' }
        else { Start-Process $Update -ArgumentList '--processStart', 'Discord.exe', '--process-start-args', "`"$FlagText`"" }
        Say 'Discord restarted.' 'Green'
    }
} elseif (-not $Undo) {
    Start-Process $Update -ArgumentList '--processStart', 'Discord.exe', '--process-start-args', "`"$FlagText`""
    Say 'Started Discord with the boost.' 'Green'
}
Say 'Always open Discord from its shortcut (Start menu, desktop or taskbar) so the boost is used.'
Say 'LighthouseBoost shows "Launch boost: on" in its settings when it is working.'
Say ''
if (-not $Yes) { Read-Host 'Press Enter to close' | Out-Null }
