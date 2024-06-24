// sdk-specific imports
import { WikipediaClient } from "@agentic/stdlib";
import { createAISDKTools } from "@agentic/stdlib/ai-sdk";
import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";
import dotenv from "dotenv";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

dotenv.config();

async function main() {
    
   const wikipedia = new WikipediaClient();
   const a = await wikipedia.search({
    query: "spacex",
  });
  
  const b = await wikipedia.getPageSummary({
    title: "SpaceX",
  });

  console.log({a,b});

  const result = await generateText({
    model: ollama("lla"),
    tools: {
        wikipedia: tool({
            description: "Summarize a Wikipedia page",
            parameters: z.object({
                title: z.string().describe("page title")
            }),
            execute: async ({ title }) => {
                return {
                    text: "SpaceX is a company that makes rockets and spacecraft.",
                }
            }
        })
    },
    toolChoice: "required",
    prompt: "Get SpaceX page in wikipedia",
  });

  console.log(result.toolResults[0]);
}

main().catch(console.error);
