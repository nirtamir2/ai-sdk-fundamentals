"use server";

import type { ReactNode } from "react";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { nanoid } from "nanoid";
import { z } from "zod";
import { jokeSchema } from "./joke";
import { JokeComponent } from "./joke-component";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  const result = await streamUI({
    model: google("models/gemini-1.5-flash-latest"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: Array<ServerMessage>) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      tellAJoke: {
        description: "Tell a joke",
        parameters: z.object({
          location: z.string().describe("the users location"),
        }),
        async *generate({ location }) {
          yield <div>loading...</div>;
          const joke = await generateObject({
            model: google("models/gemini-1.5-flash-latest"),
            schema: jokeSchema,
            prompt: `Generate a joke that incorporates the following location:${
              location
            }`,
          });
          return <JokeComponent joke={joke.object} />;
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<Array<ServerMessage>, Array<ClientMessage>>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
