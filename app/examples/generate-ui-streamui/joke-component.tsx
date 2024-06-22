"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Joke } from "./joke";

export const JokeComponent = ({ joke }: { joke?: Joke }) => {
  const [showPunchline, setShowPunchline] = useState(false);
  return (
    <div className="m-4 flex max-w-prose items-center justify-between rounded-md bg-neutral-100 p-4">
      <p>{showPunchline ? joke?.punchline : joke?.setup}</p>
      <Button
        disabled={showPunchline}
        variant="outline"
        onClick={() => setShowPunchline(true)}
      >
        Show Punchline!
      </Button>
    </div>
  );
};
