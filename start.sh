#!/bin/bash
cd "$(dirname "$0")"
echo "🌸 Deep Dream Nailart"
echo "🌐 http://localhost:8000"
echo "🛑 Ctrl+C untuk stop"
echo ""
python3 -m http.server 8000
