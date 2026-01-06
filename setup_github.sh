#!/bin/bash

# Define repo name
REPO_NAME="bitsgoaclubs"

echo "🚀 Setting up GitHub Repository: $REPO_NAME"

# Check if logged in
if ! gh auth status &>/dev/null; then
  echo "⚠️  You are not logged into GitHub CLI."
  echo "👉 Please run: gh auth login"
  exit 1
fi

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit for BITS Goa Clubs Website"
fi

# Create repo (public) and push
echo "creating repo..."
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
  echo "✅ Repository created and code pushed!"
  echo "🔗 View it here: https://github.com/$(gh api user -q .login)/$REPO_NAME"
  echo "👉 Now import this repo into Vercel for one-click deploy."
else
  echo "❌ Failed to create repo. Using existing origin if setup..."
  git push -u origin main
fi
