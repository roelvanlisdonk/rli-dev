# This script contains git commandline tasks
# Usage: Set correct location and branch name before running tasks.
# Note: When you set a variable this variable will be available as long as you don't close the integrated terminal.

# Locations
Set-Location "C:\Dev\rli-dev"

# Branch names
$branch_name = "feature/my-feature-branch"
Write-Host "branch nane: $branch_name"

function CreateFeatureBranch {
    git checkout "master"
    git pull --all
    git checkout -b $branch_name, "master"
    git push --set-upstream origin $branch_name

    # Check if all is working correctly
    npm install
    npm run lint:fix
    npm run test:ci

    # Run production build
    npm run start:prod:local
}

function DeleteLocalBranches {
    $branches = @(
        "feature/my-feature-branch-1"
        , "feature/my-feature-branch-2"
    )
    foreach ($branch in $branches) {
        git branch -d $branch
    }
}

function DeleteRemoteBranch {
    git push -d origin $branch_name
}

function DiscardLocalChanges {
    git reset --hard
}

function GenerateNewAngularApp {
    ng new my-first-project
}

function GetLatesVersionForCurrentBranch {
    git pull --all
    git status
}

function GetLatestVersionForFeatureBranch {
    git checkout $branch_name
    git pull --all
    git status
}

function GetLatestVersionForMaster {
    git checkout "master"
    git pull --all
    git status
}

function KillProcessByPortNumber {
    # Find process running on port 4200.
    netstat -ano | findstr :4200
    
    # Kill the process by PID.
    taskkill /PID 17524 /F
}

function ListGlobalNpmPackages {
    npm list -g --depth 0
}

function MergeMasterToFeatureBranch {
    git checkout "master"
    git pull --all
    git checkout $branch_name
    git pull --all
    git status

    git merge master
    git commit -m "merge master to feature branch [$branch_name]"
    git status
}

function UpdateNpmPackages {
    # Check for outdated local packages 
    npm outdated --depth=0
    npm update

    # NPM update global
    npm outdated -g --depth=0
    npm update -g
}
