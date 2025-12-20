@echo off
setlocal enabledelayedexpansion

set "OUTPUT=%~dp0\dist\pl.user.js"
set "OUTPUT_META=%~dp0\dist\pl.meta.js"

set "SOURCE=%~dp0\src"

:: Remove old output file if it exists
if exist "%OUTPUT%" del "%OUTPUT%"
if exist "%OUTPUT_META%" del "%OUTPUT_META%"

echo Setting update meta ...
type "%SOURCE%\0-0-us-info.part.js" >> "%OUTPUT_META%"

:: Loop through all '0' files
:: for %%f in ("%SOURCE%\0-*.part.js") do (
::     if /i not "%%f"=="%OUTPUT%" (
::         echo Adding %%f ...
::         type "%%f" >> "%OUTPUT%"
::         (
::         echo(
::         ) >> "%OUTPUT%"
::     )
:: )

:: Loop through all files
for %%f in ("%SOURCE%\*.part.js") do (
    if /i not "%%f"=="%OUTPUT%" (
        echo Adding %%f ...
        type "%%f" >> "%OUTPUT%"
        (
        echo(
        ) >> "%OUTPUT%"
    )
)

timeout 1