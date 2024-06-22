"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const generateTextAction = async () => {
  const result = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 1,
    prompt: "Tell me a joke.",
  });
  return result.text;
};
