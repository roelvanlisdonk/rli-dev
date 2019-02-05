# This script assumes the linked service json files can be found in the folder .\linkedService, relative to the location of this script.

param (
    [Parameter(Mandatory=$True)]
    [string]
    $ResourceGroupName,

    [Parameter(Mandatory=$True)]
    [string]
    $DataFactoryName,

    [Parameter(Mandatory=$True)]
    [string]
    $Find,

    [Parameter(Mandatory=$True)]
    [string]
    $Replace
)

$root = $PSScriptRoot
$scriptName = $MyInvocation.MyCommand.Name
Write-Host "$scriptName - start"

Write-Host "Get all linked service json file names"
$linkedServicesPath = "$root\linkedService"
$names = Get-ChildItem -Path "$linkedServicesPath" -Name

Write-Host "Loop file names"
foreach ($name in $names)
{
    Write-Host "Find the text [$Find] and replace with [$Replace] in the file [$path]."
    $path = [System.IO.Path]::Combine($linkedServicesPath, $name)
    (Get-Content -Path "$path" -Raw).Replace("$Find", "$Replace") | Set-Content -Path "$path"

    $linkedServiceName = [System.IO.Path]::GetFileNameWithoutExtension($name)
    Write-Host "Update the linked service [$linkedServiceName] on ResourceGroupName [$ResourceGroupName] in DataFactoryName [$DataFactoryName] by using File [$path] on Azure.."
    Set-AzureRmDataFactoryV2LinkedService -ResourceGroupName "$ResourceGroupName" -DataFactoryName "$DataFactoryName" -Name "$linkedServiceName" -File "$path"
}

Write-Host "$scriptName - end"