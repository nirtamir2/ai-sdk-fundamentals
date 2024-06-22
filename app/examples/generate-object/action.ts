"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const generateObjectAction = async () => {
  const { object: joke } = await generateObject({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0.5,
    prompt: "Tell me a joke.",
    schema: z.object({
      joke: z.object({
        setup: z.string().describe("the setup for the joke"),
        punchline: z.string().describe("the punchline for the joke"),
      }),
    }),
  });
  return joke;
};
