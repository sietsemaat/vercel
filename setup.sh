#!/bin/bash

# Setup Script for Modern Headless CMS Architecture
# React 19 + Strapi 5 + Vite + TypeScript + Tailwind

echo "🚀 Starting setup..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install -D typescript @types/react @types/react-dom autoprefixer postcss tailwindcss eslint-plugin-jsx-a11y
npm install @tanstack/react-query react-hook-form zod react-ga4 isomorphic-dompurify react-helmet-async clsx tailwind-merge lucide-react react-router-dom

# 2. Initialize Tailwind
echo "🎨 Initializing Tailwind CSS..."
# Note: tailwind.config.js and postcss.config.js are already created by the agent

# 3. Create Directory Structure
echo "📂 Creating directory structure..."
mkdir -p src/components/ui
mkdir -p src/components/blocks
mkdir -p src/hooks
mkdir -p src/pages
mkdir -p src/api
mkdir -p src/lib

# 4. Setup Complete
echo "✅ Setup complete! You can now run 'npm run dev' to start the development server."
