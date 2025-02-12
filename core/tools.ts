import { google } from "@ai-sdk/google";
import { generateText, streamText, tool } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  const location = "London";
  const result = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: `You are a funny chatbot. users location: ${location}`,
    tools: {
      weather: tool({
        description: "Get the weather for the user's location",
        parameters: z.object({
          location: z.string().describe("user's location"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.floor(Math.random() * 31); // call external api for {location}
          return { temperature, location };
        },
      }),
    },
  });

  if (result.toolResults && result.toolCalls) {
    const joke = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: `Tell me a joke that incorporates ${location}
               and it's current temperature (${result.toolResults[0].result.temperature})`,
    });

    for await (const textPart of joke.textStream) {
      process.stdout.write(textPart);
    }
  }
}

main().catch(console.error);
