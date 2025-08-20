# JSMAW VS Code Setup Guide

## Quick Launch Options

### Option 1: VS Code Tasks (Recommended)
1. **Open Command Palette**: `Cmd+Shift+P`
2. **Type**: `Tasks: Run Task` 
3. **Select**: `JSMAW: Launch All Agents`

This will open 6 separate terminal panes:
- Jekyll dev server
- 5 Claude agent terminals

### Option 2: Terminal Profiles  
1. **Open Terminal**: `Cmd+Shift+`` ` 
2. **Click dropdown** next to `+` button
3. **Select**:
   - `JSMAW Content Agent`
   - `JSMAW SEO Agent` 
   - `JSMAW Design Agent`
   - `JSMAW Performance Agent`
   - `JSMAW Code Review Agent`

### Option 3: Manual Terminal Split
1. **Open terminal**: `Cmd+Shift+`` `
2. **Split panes**: `Cmd+\` to split horizontally
3. **In each pane run**: `claude --dangerously-skip-permissions`

## Agent Initialization

In each Claude terminal, paste the corresponding context file content:

**Content Agent**: Copy from `claude-contexts/content-agent.md`
```bash
# Paste: "You are the Content Strategy Agent in the JSMAW framework..."
```

**SEO Agent**: Copy from `claude-contexts/seo-agent.md`
```bash
# Paste: "You are the SEO Agent in the JSMAW framework..."
```

**Design Agent**: Copy from `claude-contexts/design-agent.md`
```bash
# Paste: "You are the Theme/Design Agent in the JSMAW framework..."
```

**Performance Agent**: Copy from `claude-contexts/performance-agent.md`
```bash
# Paste: "You are the Performance Agent in the JSMAW framework..."
```

**Review Agent**: Copy from `claude-contexts/review-agent.md` 
```bash
# Paste: "You are the Code Review Agent in the JSMAW framework..."
```

## VS Code Features Configured

✅ **Custom Terminal Profiles** - Quick agent launching
✅ **Tasks Integration** - One-click framework startup  
✅ **File Nesting** - Clean explorer with agent contexts grouped
✅ **Markdown Preview** - Enhanced collaboration file viewing
✅ **Extension Recommendations** - Helpful VS Code extensions

## Workflow

1. **Launch JSMAW**: Use VS Code tasks or terminal profiles
2. **Initialize Agents**: Paste context into each Claude terminal
3. **Work on Site**: Edit Jekyll files as normal
4. **Check Collaboration Files**: 
   - `collaboration/content-notes.md`
   - `collaboration/seo-notes.md`
   - `collaboration/design-notes.md` 
   - `collaboration/performance-notes.md`
   - `collaboration/review-notes.md`
5. **Prompt Agents**: Ask specific questions about changes
6. **Implement Feedback**: Use agent suggestions to improve site

## Quick Commands

- **Start Framework**: `Cmd+Shift+P` → `Tasks: Run Task` → `JSMAW: Launch All Agents`
- **New Agent Terminal**: Terminal dropdown → Select agent profile
- **Split Terminal**: `Cmd+\`
- **Switch Terminal**: `Cmd+`` ` then arrow keys
- **Open Collaboration Files**: `Cmd+P` → `collaboration/`

## Tips

- Keep collaboration files open in tabs for quick reference
- Use VS Code's integrated Git to track agent recommendations
- Split editor panes to view agent contexts while working
- Use `Cmd+Shift+E` to quickly navigate between Jekyll files and agent contexts