#!/usr/bin/env bash
# Sislecv Homepage — local HTTP server (WASM requires HTTP)
set -e
cd "$(dirname "$0")"
PORT="${1:-8899}"
echo "  ╔══════════════════════════════╗"
echo "  ║  SISLEVC 5151  Personal Page ║"
echo "  ╚══════════════════════════════╝"
echo ""
echo "  Open: http://localhost:${PORT}/"
echo "  Ctrl+C to stop"
echo ""
python3 -m http.server "$PORT" --bind 127.0.0.1
