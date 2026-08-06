#!/bin/bash
echo "🌱 Starting the database seeding process..."

# Navigate to the backend application folder
cd apps/backend || { echo "Failed to navigate to apps/backend"; exit 1; }

# Execute the seed script defined in package.json
echo "Running 'npm run seed' in apps/backend..."
npm run seed

echo "✅ Database seeding process finished."
