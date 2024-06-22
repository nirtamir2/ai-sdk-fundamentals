"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const generateTextAction = async () => {
  const result = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 1,
    prompt: "Tell me a joke.",
  });
  return result.text;
};
