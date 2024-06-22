"use client";

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import type { ClientMessage } from "./action";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setInput("");
          setConversation((currentConversation: Array<ClientMessage>) => [
            ...currentConversation,
            { id: nanoid(), role: "user", display: input },
          ]);

          const message = await continueConversation(input);

          setConversation((currentConversation: Array<ClientMessage>) => [
            ...currentConversation,
            message,
          ]);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
