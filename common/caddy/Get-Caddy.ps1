function Get-Caddy () {
    $BinPath = Join-Path $PSScriptRoot "..\caddy"
    $CaddyExe = Join-Path $BinPath "caddy.exe"

    $Uri = "https://github.com/caddyserver/caddy/releases/download/v2.3.0/caddy_2.3.0_windows_amd64.zip"
    $Zip = Join-Path $BinPath "caddy_2.3.0_windows_amd64.zip"

    if (Test-Path $CaddyExe) {
        Write-Host "Caddy found at expected path. Proceeding ..."
    }
    else {
        Write-Host "No Caddy found at expected path. Will download from https://github.com/caddyserver/caddy ..."
        $ProgressPreference = "SilentlyContinue"
        Invoke-WebRequest -Uri $Uri -OutFile $Zip
        Write-Host "Extracting caddy.exe from archive ..."
        Expand-Archive -Path $Zip -DestinationPath $BinPath
    }
}

Get-Caddy
