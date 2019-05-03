
Just some small Power Shell script to replace absolute paths with relative paths in TypeScript.
I needed this because inside an Angular Library NPM package we where using tsconfig 'path mapping',
but this caused some issues when using this library inside an angular application.

The script will changes TypeScript code like:

```typescript
import { UserRouteAccessService } from 'folder-3/folder-4/folder-5/folder-6/shared/auth/user-route-access-service';
```

into

```typescript
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
```


```powershell

function changeAbsolutePathsToRelativePaths {
    $rootFolder = "C:\Dev\folder-1\folder-2\folder-3\folder-4\folder-5\folder-6"
    Set-Location $rootFolder
    $find = "'folder-3/folder-4/folder-5/folder-6/"
    
    # Files in the root folder should use "./"
    $replaceWithForRoot = "./"
    processFolder -folder $rootFolder -find $find -replaceWith $replaceWithForRoot
}

function processFolder {
    param($folder, $find, $replaceWith)

    $files = [System.IO.Directory]::GetFiles($folder)
    foreach ($file in $files) {
        replaceTextInFile -file $file -find $find -replaceWith $replaceWith
    }

    # Files in sub folders should use "../"
    if($replaceWith -eq "./") {
        $replaceWith = ""
    }
    $replaceWith = $replaceWith + "../"
    $subFolders = [System.IO.Directory]::GetDirectories($folder)
    foreach ($subFolder in $subFolders) {
        processFolder -folder $subFolder -find $find -replaceWith $replaceWith
    }
}

function replaceTextInFile {
    param($file, $find, $replaceWith)

    $text = [System.IO.File]::ReadAllText($file)
    $newText = $text.Replace($find, "'" + $replaceWith)
    if ($text -ne $newText) {
        Write-Host "Replace $find with $replaceWith in $file"
        [System.IO.File]::WriteAllText($file, $newText)
    }
}

changeAbsolutePathsToRelativePaths

```


