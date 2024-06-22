"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateTextAction } from "./action";

export default function Page() {
  const [generation, setGeneration] = useState("");
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stream Text Tool Example</h1>
      <form
        action={async (data) => {
          const location = data.get("location") as string;
          const result = await generateTextAction(location);
          if (result) {
            for await (const delta of readStreamableValue(result)) {
              setGeneration(delta ?? "");
            }
          }
        }}
      >
        <Input required name="location" placeholder="San Francisco" />
        <Button>Tell me a joke</Button>
      </form>
      <pre>{generation}</pre>
    </div>
  );
}
