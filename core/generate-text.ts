import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const result = await generateText({
    model: google("models/gemini-1.5-flash-latest"),
    prompt: "Tell me a joke.",
  });

  console.log(result.text);
}

main().catch(console.error);
