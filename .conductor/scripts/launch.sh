#!/bin/bash
# Conductor CLI Launch Script
echo "🦆 Launching Conductor CLI with Claude Code..."
echo "📋 Loading project context and AI agents..."

# Check if Claude Code is available
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code not found. Please install Claude Code first."
    echo "💡 Visit: https://claude.ai/code"
    exit 1
fi

# Launch with project context
claude --project-path="$(pwd)" --load-context=".conductor/conductor.config.json"
