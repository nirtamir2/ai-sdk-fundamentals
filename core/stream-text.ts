import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: "Tell me a joke.",
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
