@echo off
powershell -NoProfile -ExecutionPolicy Unrestricted .\common\caddy\Get-Caddy.ps1

.\common\caddy\caddy.exe file-server -browse -listen :42080
pause
