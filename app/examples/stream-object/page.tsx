"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { Button } from "@/components/ui/button";
import type { Joke } from "./action";
import { streamObjectAction } from "./action";

export default function Page() {
  const [generation, setGeneration] = useState<Joke>();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stream Object Example</h1>
      <Button
        onClick={async () => {
          const result = await streamObjectAction();
          for await (const delta of readStreamableValue(result))
            setGeneration(delta);
        }}
      >
        Tell me a joke
      </Button>
      <pre>{JSON.stringify(generation, null, 2)}</pre>
    </div>
  );
}
