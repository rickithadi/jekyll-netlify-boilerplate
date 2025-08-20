#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import puppeteer, { Browser, Page } from "puppeteer";

interface PuppeteerConfig {
  headless?: boolean;
  executablePath?: string;
  args?: string[];
  viewport?: {
    width: number;
    height: number;
  };
}

class PuppeteerServer {
  private server: Server;
  private browser: Browser | null = null;
  private page: Page | null = null;
  private config: PuppeteerConfig;

  constructor() {
    this.server = new Server(
      {
        name: "puppeteer-server",
        version: "0.3.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Default configuration
    this.config = {
      headless: process.env.PUPPETEER_HEADLESS !== "false",
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      viewport: {
        width: 1280,
        height: 720,
      },
    };

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", () => {
      this.cleanup();
      process.exit(0);
    });
  }

  private async initializeBrowser(): Promise<void> {
    if (this.browser) return;

    try {
      this.browser = await puppeteer.launch(this.config);
      this.page = await this.browser.newPage();
      if (this.config.viewport) {
        await this.page.setViewport(this.config.viewport);
      }
    } catch (error) {
      throw new Error(`Failed to initialize browser: ${error}`);
    }
  }

  private async cleanup(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "puppeteer_navigate",
          description: "Navigate to a URL",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "The URL to navigate to",
              },
            },
            required: ["url"],
          },
        },
        {
          name: "puppeteer_screenshot",
          description: "Take a screenshot of the current page",
          inputSchema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name for the screenshot",
                default: "screenshot.png",
              },
              selector: {
                type: "string",
                description: "CSS selector to screenshot specific element",
              },
              fullPage: {
                type: "boolean",
                description: "Take full page screenshot",
                default: false,
              },
            },
          },
        },
        {
          name: "puppeteer_click",
          description: "Click on an element",
          inputSchema: {
            type: "object",
            properties: {
              selector: {
                type: "string",
                description: "CSS selector for the element to click",
              },
            },
            required: ["selector"],
          },
        },
        {
          name: "puppeteer_type",
          description: "Type text into an input field",
          inputSchema: {
            type: "object",
            properties: {
              selector: {
                type: "string",
                description: "CSS selector for the input field",
              },
              text: {
                type: "string",
                description: "Text to type",
              },
            },
            required: ["selector", "text"],
          },
        },
        {
          name: "puppeteer_evaluate",
          description: "Execute JavaScript in the browser console",
          inputSchema: {
            type: "object",
            properties: {
              script: {
                type: "string",
                description: "JavaScript code to execute",
              },
            },
            required: ["script"],
          },
        },
        {
          name: "puppeteer_wait_for_selector",
          description: "Wait for an element to appear",
          inputSchema: {
            type: "object",
            properties: {
              selector: {
                type: "string",
                description: "CSS selector to wait for",
              },
              timeout: {
                type: "number",
                description: "Timeout in milliseconds",
                default: 30000,
              },
            },
            required: ["selector"],
          },
        },
        {
          name: "puppeteer_get_content",
          description: "Get the HTML content of the page or an element",
          inputSchema: {
            type: "object",
            properties: {
              selector: {
                type: "string",
                description: "CSS selector for specific element (optional)",
              },
            },
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        await this.initializeBrowser();
        if (!this.page) {
          throw new Error("Browser page not initialized");
        }

        const { name, arguments: args } = request.params;

        switch (name) {
          case "puppeteer_navigate": {
            const { url } = args as { url: string };
            await this.page.goto(url, { waitUntil: "networkidle2" });
            return {
              content: [
                {
                  type: "text",
                  text: `Navigated to ${url}`,
                },
              ],
            };
          }

          case "puppeteer_screenshot": {
            const { name = "screenshot.png", selector, fullPage = false } = args as {
              name?: string;
              selector?: string;
              fullPage?: boolean;
            };

            let screenshotBuffer: Buffer;

            if (selector) {
              const element = await this.page.$(selector);
              if (!element) {
                throw new Error(`Element not found: ${selector}`);
              }
              screenshotBuffer = Buffer.from(await element.screenshot());
            } else {
              screenshotBuffer = Buffer.from(await this.page.screenshot({ fullPage }));
            }

            const base64 = screenshotBuffer.toString("base64");
            return {
              content: [
                {
                  type: "image",
                  data: base64,
                  mimeType: "image/png",
                },
              ],
            };
          }

          case "puppeteer_click": {
            const { selector } = args as { selector: string };
            await this.page.click(selector);
            return {
              content: [
                {
                  type: "text",
                  text: `Clicked element: ${selector}`,
                },
              ],
            };
          }

          case "puppeteer_type": {
            const { selector, text } = args as { selector: string; text: string };
            await this.page.type(selector, text);
            return {
              content: [
                {
                  type: "text",
                  text: `Typed "${text}" into ${selector}`,
                },
              ],
            };
          }

          case "puppeteer_evaluate": {
            const { script } = args as { script: string };
            const result = await this.page.evaluate(script);
            return {
              content: [
                {
                  type: "text",
                  text: `Script executed. Result: ${JSON.stringify(result)}`,
                },
              ],
            };
          }

          case "puppeteer_wait_for_selector": {
            const { selector, timeout = 30000 } = args as {
              selector: string;
              timeout?: number;
            };
            await this.page.waitForSelector(selector, { timeout });
            return {
              content: [
                {
                  type: "text",
                  text: `Element appeared: ${selector}`,
                },
              ],
            };
          }

          case "puppeteer_get_content": {
            const { selector } = args as { selector?: string };
            let content: string;
            
            if (selector) {
              const element = await this.page.$(selector);
              if (!element) {
                throw new Error(`Element not found: ${selector}`);
              }
              content = await this.page.evaluate(el => el.innerHTML, element);
            } else {
              content = await this.page.content();
            }

            return {
              content: [
                {
                  type: "text",
                  text: content,
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Puppeteer MCP server running on stdio");
  }
}

const server = new PuppeteerServer();
server.run().catch(console.error);