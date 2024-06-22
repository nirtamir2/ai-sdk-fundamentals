"use server";

import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export const streamTextAction = async () => {
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    temperature: 0.5,
    prompt: "Tell me a joke.",
  });
  return createStreamableValue(result.textStream).value;
};
