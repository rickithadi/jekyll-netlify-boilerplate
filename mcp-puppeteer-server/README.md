# MCP Puppeteer Server

A Model Context Protocol (MCP) server that provides browser automation capabilities using Puppeteer. This server enables LLMs to interact with web pages through tools like navigation, screenshots, clicking, and JavaScript execution.

## Features

- **Navigation**: Navigate to URLs with `puppeteer_navigate`
- **Screenshots**: Capture page or element screenshots with `puppeteer_screenshot`
- **Interaction**: Click elements with `puppeteer_click`
- **Input**: Type text into form fields with `puppeteer_type`
- **JavaScript**: Execute custom JavaScript with `puppeteer_evaluate`
- **Wait**: Wait for elements to appear with `puppeteer_wait_for_selector`
- **Content**: Get HTML content with `puppeteer_get_content`

## Installation

```bash
npm install
npm run build
```

## Usage

### As a Standalone Server

```bash
npm start
```

### As an MCP Server

Configure in your MCP client settings:

```json
{
  "servers": {
    "puppeteer": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "path/to/mcp-puppeteer-server"
    }
  }
}
```

## Configuration

Environment variables for browser configuration:

- `PUPPETEER_HEADLESS`: Set to "false" to run browser in headed mode (default: true)
- `PUPPETEER_EXECUTABLE_PATH`: Custom Chrome/Chromium executable path

## Tools Reference

### puppeteer_navigate

Navigate to a URL.

**Parameters:**
- `url` (string): The URL to navigate to

**Example:**
```json
{
  "name": "puppeteer_navigate",
  "arguments": {
    "url": "https://example.com"
  }
}
```

### puppeteer_screenshot

Take a screenshot of the page or a specific element.

**Parameters:**
- `name` (string, optional): Name for the screenshot (default: "screenshot.png")
- `selector` (string, optional): CSS selector to screenshot specific element
- `fullPage` (boolean, optional): Take full page screenshot (default: false)

**Example:**
```json
{
  "name": "puppeteer_screenshot",
  "arguments": {
    "name": "homepage.png",
    "fullPage": true
  }
}
```

### puppeteer_click

Click on an element.

**Parameters:**
- `selector` (string): CSS selector for the element to click

**Example:**
```json
{
  "name": "puppeteer_click",
  "arguments": {
    "selector": "#submit-button"
  }
}
```

### puppeteer_type

Type text into an input field.

**Parameters:**
- `selector` (string): CSS selector for the input field
- `text` (string): Text to type

**Example:**
```json
{
  "name": "puppeteer_type",
  "arguments": {
    "selector": "#username",
    "text": "user@example.com"
  }
}
```

### puppeteer_evaluate

Execute JavaScript in the browser console.

**Parameters:**
- `script` (string): JavaScript code to execute

**Example:**
```json
{
  "name": "puppeteer_evaluate",
  "arguments": {
    "script": "document.title"
  }
}
```

### puppeteer_wait_for_selector

Wait for an element to appear on the page.

**Parameters:**
- `selector` (string): CSS selector to wait for
- `timeout` (number, optional): Timeout in milliseconds (default: 30000)

**Example:**
```json
{
  "name": "puppeteer_wait_for_selector",
  "arguments": {
    "selector": ".loading-complete",
    "timeout": 10000
  }
}
```

### puppeteer_get_content

Get the HTML content of the page or a specific element.

**Parameters:**
- `selector` (string, optional): CSS selector for specific element

**Example:**
```json
{
  "name": "puppeteer_get_content",
  "arguments": {
    "selector": ".main-content"
  }
}
```

## License

MIT License - see LICENSE file for details.