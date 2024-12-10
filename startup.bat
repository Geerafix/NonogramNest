@echo off

cd /d "%~dp0\api"
start cmd /k "node setup.js && nodemon server.js"

cd /d "%~dp0"
start cmd /k "npx vite --port 4000"

pause