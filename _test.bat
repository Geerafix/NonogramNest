@echo off

cd /d "%~dp0/api"
start cmd /k "node setup.js && npx vitest"

pause