# GitHub Authentication Setup

You're seeing a permission error because Git is using wrong credentials. Here are solutions:

## Option 1: Use GitHub Desktop (Easiest)
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your Sachink122 account
3. Add this repository (File → Add Local Repository)
4. Click "Publish repository" button

## Option 2: Personal Access Token (Recommended)
1. Go to GitHub: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Portfolio Push"
4. Select scopes: ✅ repo (all)
5. Click "Generate token"
6. Copy the token (save it somewhere safe!)

Then push with token:
```bash
git remote set-url origin https://Sachink122:YOUR_TOKEN_HERE@github.com/Sachink122/profectional_portfolio.git
git push -u origin main
```

## Option 3: Clear Credentials & Re-authenticate
```bash
# Clear Windows Credential Manager
cmdkey /list | findstr "git"
cmdkey /delete:git:https://github.com

# Then push (will ask for credentials)
git push -u origin main
```
When prompted:
- Username: Sachink122
- Password: Your Personal Access Token (not your GitHub password!)

## Option 4: Use SSH Instead
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "sgsk1sachin@gmail.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Then change remote URL
git remote set-url origin git@github.com:Sachink122/profectional_portfolio.git
git push -u origin main
```

## Quick Fix (For Now)
Run this command and follow the prompts:
```bash
git credential-manager erase
protocol=https
host=github.com

git push -u origin main
```

Choose the option that works best for you!
