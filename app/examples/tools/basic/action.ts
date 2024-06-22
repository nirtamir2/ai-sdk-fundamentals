"use server";

import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

export const generateTextAction = async (location: string) => {
  "use server";
  const { toolResults, toolCalls } = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0.8,
    prompt: `You are a funny chatbot. users location: ${location}`,
    tools: {
      weather: {
        description: "Get the weather for the user's location",
        parameters: z.object({
          location: z.string().describe("user's location"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.floor(Math.random() * 31); // call external api for {location}
          return { temperature };
        },
      },
    },
  });
  if (toolResults && toolCalls) {
    const joke = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt: `Tell me a joke that incorporates ${location} and it's current temperature (${toolResults[0].result.temperature})`,
    });
    return createStreamableValue(joke.textStream).value;
  }
};
