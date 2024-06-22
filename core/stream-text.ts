import { streamText } from "ai";
import dotenv from "dotenv";
import { ollama } from "ollama-ai-provider";

dotenv.config();

async function main() {
  const result = await streamText({
    model: ollama("llama3"),
    prompt: "Tell me a joke.",
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
