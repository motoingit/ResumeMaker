
# push in git

git init
touch README.md .gitignore
git add .
git commit -m "first commit"
git branch -M main

git remote add origin git@github.com:motoingit/ResumeMaker.git
git remote add origin https://github.com/motoingit/ResumeMaker.git

git push -u origin main

# Make main the default for all future repositories (GLOBALLY)

git config --list

git config --global init.defaultBranch main
git config --global user.name "motoingit"
git config --global user.email "mohitsinghinsecondary@gmail.com"



# setup git - shh (https://chatgpt.com/s/t_6a3d64d017788191a4edbe8a35eea436)
  One-Time Setup Checklist ✅
    Install Git
    Configure user.name
    Configure user.email
    Set recommended Git options
    Generate SSH key
    Start SSH agent
    Add SSH key to agent
    Add public key to GitHub
    Test with ssh -T git@github.com
    Use SSH remotes (git@github.com:...)
    Make first commit
    Push with git push -u origin main

# if wrong commit message
git reset --soft HEAD~1
git commit -m "Better commit message"
