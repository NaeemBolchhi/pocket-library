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

:: Loop through all '0' files
for %%f in ("%SOURCE%\0-*.part.js") do (
    if /i not "%%f"=="%OUTPUT%" (
        echo Adding %%f ...
        type "%%f" >> "%OUTPUT%"
        (
        echo(
        ) >> "%OUTPUT%"
    )
)

:: Add all '1' files
echo Adding 1-0-styles-start.part.js ...
type "%SOURCE%\1-0-styles-start.part.js" >> "%OUTPUT%"
(
	echo(
) >> "%OUTPUT%"
echo Adding 1-1-styles-main.part.css ...
type "%SOURCE%\1-1-styles-main.part.css" >> "%OUTPUT%"
(
	echo(
) >> "%OUTPUT%"
echo Adding 1-2-styles-end.part.js ...
type "%SOURCE%\1-2-styles-end.part.js" >> "%OUTPUT%"
(
	echo(
) >> "%OUTPUT%"

:: Loop through all '2' files
for %%f in ("%SOURCE%\2-*.part.js") do (
    if /i not "%%f"=="%OUTPUT%" (
        echo Adding %%f ...
        type "%%f" >> "%OUTPUT%"
        (
        echo(
        ) >> "%OUTPUT%"
    )
)

timeout 1