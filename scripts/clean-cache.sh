#!/bin/bash
echo "🧹 Cleaning monorepo caches and build artifacts..."

# Find and remove all node_modules directories
echo "Removing node_modules..."
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# Find and remove all dist/build directories
echo "Removing dist/build folders..."
find . -name "dist" -type d -prune -exec rm -rf '{}' +
find . -name ".next" -type d -prune -exec rm -rf '{}' +
find . -name "build" -type d -prune -exec rm -rf '{}' +

# Find and remove turbo caches
echo "Removing .turbo caches..."
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +

echo "✅ Cache cleaned successfully! Don't forget to run 'npm install' to reinstall dependencies."
