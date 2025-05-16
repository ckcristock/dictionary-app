@echo off
cd src\app

:: Crear carpetas si no existen
if not exist assets mkdir assets
if not exist components mkdir components
if not exist hooks mkdir hooks
if not exist providers mkdir providers
if not exist store mkdir store
if not exist types mkdir types
if not exist utils mkdir utils

:: Crear archivos en components
cd components
if not exist Header.tsx echo. > Header.tsx
if not exist SearchBar.tsx echo. > SearchBar.tsx
if not exist FontSelector.tsx echo. > FontSelector.tsx
if not exist ThemeToggle.tsx echo. > ThemeToggle.tsx
if not exist DefinitionResult.tsx echo. > DefinitionResult.tsx
cd..

:: Crear archivos en hooks
cd hooks
if not exist useTheme.ts echo. > useTheme.ts
if not exist useFont.ts echo. > useFont.ts
cd..

:: Crear archivos en providers
cd providers
if not exist theme-provider.tsx echo. > theme-provider.tsx
cd..

:: Crear archivos en store
cd store
if not exist index.ts echo. > index.ts
cd..

:: Crear archivos en types
cd types
if not exist index.ts echo. > index.ts
cd..

:: Crear archivos en utils
cd utils
if not exist index.ts echo. > index.ts
cd..

echo Estructura lista ✅
pause
