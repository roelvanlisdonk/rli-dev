# This script contains git commandline tasks
# Usage: Set correct location and branch name before running tasks.
# Note: When you set a variable this variable will be available as long as you don't close the integrated terminal.

# Locations
Set-Location "C:\Dev\rli-dev"

# Branch names
$branch_name = "feature/my-feature-branch"
Write-Host "branch nane: $branch_name"

function GetLatesVersionForCurrentBranch {
    git pull --all
    git status
}

function GetLatestVersionForMaster {
    git checkout "master"
    git pull --all
    git status
}

function GetLatestVersionForFeatureBranch {
    git checkout $branch_name
    git pull --all
    git status
}

function CreateFeatureBranch {
    git checkout "master"
    git pull --all
    git checkout -b $branch_name, "master"
    git push --set-upstream origin $branch_name
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

function DeleteLocalBranches {
    $branches = @(
        "feature/my-feature-branch-1"
    ,   "feature/my-feature-branch-2"
    )
    foreach($branch in $branches) {
        git branch -d $branch
    }
}

function DeleteRemoteBranch {
    git push -d origin $branch_name
}

function DiscardLocalChanges {
    git reset --hard
}

