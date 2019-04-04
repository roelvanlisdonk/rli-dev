
# The git tasks are surrounded in a if statement to prevent the tasks from running, when we accidentally press F5.
if($false) {
    
    # Generate Angular app
    Set-Location "C:\Dev\rli-dev\angular\v7"
    ng new learn-ngrx --routing
    Set-Location "C:\Dev\rli-dev\angular\v7\learn-ngrx"
    
    # To check if everything works, run ng serve now:
    ng serve -o

    # Add ngrx
    npm install ngrx --save

    # Show status of current repository
    git status


    # Get latest sources for master branch
    git checkout "master"
    git pull --all


    # Sync work with remote
    
        # Add changes for commit
        git add .

        # Commit changes
        git commit -m "Updated git.ps1"
        
        # Push changes to remote and get remote changes
        git push
        git pull --all


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
