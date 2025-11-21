#!/bin/bash
set -e

ENVIRONMENT=${1:-dev}

echo "🚀 Building Frontend for $ENVIRONMENT environment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

echo "✅ Frontend build complete!"
echo "📁 Build artifacts saved to: build/"
echo ""
echo "💡 Next: Deploy backend which will pick up build/ folder"
echo "   cd ../backend && ./deploy.sh $ENVIRONMENT"
