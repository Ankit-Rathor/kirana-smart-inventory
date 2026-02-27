#!/bin/bash

# KiranaIQ - Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting KiranaIQ..."

# Kill any existing processes on ports 3000 and 3001
echo "📌 Clearing ports..."
pkill -f "ts-node.*main.ts" 2>/dev/null
pkill -f "next.*dev" 2>/dev/null
sleep 1

# Check if backend is built
if [ ! -d "backend/dist" ]; then
    echo "📦 Building backend..."
    cd backend
    npm run build
    cd ..
fi

# Start backend in background
echo "🔧 Starting backend on port 3001..."
cd backend
npx ts-node src/main.ts &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 8

# Check if backend is running
if curl -s http://localhost:3001/api/v1/health > /dev/null 2>&1; then
    echo "✅ Backend is running!"
else
    echo "❌ Backend failed to start. Check for errors."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend on port 3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "======================================"
echo "  ✅ KiranaIQ is running!"
echo "======================================"
echo ""
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo "  API:      http://localhost:3001/api/v1"
echo ""
echo "  Press Ctrl+C to stop all servers"
echo "======================================"
echo ""

# Wait for interrupt
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Keep script running
wait
