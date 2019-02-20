
# The git tasks are surrounded in a if statement to prevent the tasks from running, when we accidentally press F5.
if($false) {
    

    # Always set location before executing git tasks
    Set-Location "C:\Dev\rli-dev\angular"
    

    # Show status of current repository
    git status


    # Get latest sources for master branch
    git checkout "master"
    git pull --all


    # Add new files for commit
    git add .


    # Commit changes
    git commit -m "Add git.ps1"


    # To remove tracked local changes
    git reset --hard
    

    # To remove untracked local changes
    git clean -d -f


    # Show local branches
    git branch


    # Show local and remote branches
    git branch -a


    # Show remote branches
    git branch -r


}
