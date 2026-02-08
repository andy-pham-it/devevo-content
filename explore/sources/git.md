# Git Commands Cheat Sheet

## Essential Git Commands

### Basic Commands

#### Initialize Repository
```bash
git init
```
Initialize a new Git repository in the current directory.

#### Clone Repository
```bash
git clone <repository-url>
```
Clone a remote repository to your local machine.

#### Check Status
```bash
git status
```
Show the working tree status and staged changes.

### Making Changes

#### Stage Changes
```bash
git add <file>          # Stage specific file
git add .               # Stage all changes
git add -A              # Stage all changes including deletions
```

#### Commit Changes
```bash
git commit -m "message"           # Commit with message
git commit -am "message"          # Stage and commit tracked files
git commit --amend                # Amend last commit
```

### Branching

#### Create & Switch Branches
```bash
git branch <branch-name>          # Create new branch
git checkout <branch-name>        # Switch to branch
git checkout -b <branch-name>     # Create and switch
git switch <branch-name>          # Modern way to switch
git switch -c <branch-name>       # Create and switch (modern)
```

#### List & Delete Branches
```bash
git branch                        # List local branches
git branch -a                     # List all branches
git branch -d <branch-name>       # Delete merged branch
git branch -D <branch-name>       # Force delete branch
```

### Remote Operations

#### Manage Remotes
```bash
git remote -v                     # List remotes
git remote add origin <url>       # Add remote
git remote remove <name>          # Remove remote
```

#### Push & Pull
```bash
git push origin <branch>          # Push to remote
git push -u origin <branch>       # Push and set upstream
git pull origin <branch>          # Pull from remote
git fetch origin                  # Fetch updates
```

### Merging & Rebasing

#### Merge
```bash
git merge <branch-name>           # Merge branch into current
git merge --no-ff <branch>        # Merge with merge commit
```

#### Rebase
```bash
git rebase <branch>               # Rebase current onto branch
git rebase -i HEAD~3              # Interactive rebase last 3 commits
```

### Undoing Changes

#### Discard Changes
```bash
git checkout -- <file>            # Discard changes in file
git restore <file>                # Modern way to discard
git clean -fd                     # Remove untracked files/dirs
```

#### Reset
```bash
git reset HEAD <file>             # Unstage file
git reset --soft HEAD~1           # Undo last commit, keep changes staged
git reset --hard HEAD~1           # Undo last commit, discard changes
```

### Viewing History

#### Log
```bash
git log                           # View commit history
git log --oneline                 # Compact view
git log --graph --oneline         # Graph view
git log -p <file>                 # Show changes in file
```

#### Diff
```bash
git diff                          # Show unstaged changes
git diff --staged                 # Show staged changes
git diff <branch1> <branch2>      # Compare branches
```

### Stashing

```bash
git stash                         # Stash changes
git stash list                    # List stashes
git stash pop                     # Apply and remove last stash
git stash apply                   # Apply last stash
git stash drop                    # Remove last stash
```

### Tags

```bash
git tag                           # List tags
git tag <tag-name>                # Create lightweight tag
git tag -a <tag-name> -m "msg"    # Create annotated tag
git push origin <tag-name>        # Push tag to remote
```

## Pro Tips

- Use `git status` frequently to know where you are
- Write clear, descriptive commit messages
- Commit often with logical chunks of work
- Always pull before pushing
- Use feature branches for new work
- Review changes before committing with `git diff`
