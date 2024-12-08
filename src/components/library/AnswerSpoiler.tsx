"use client";

import { Spoiler } from "spoiled";

import { useState } from "react";

interface Props {
  answers: string[];
}

export function AnswerSpoiler({ answers }: Props) {
  const [hidden, setHidden] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0]);

  const handleMouseEnter = () => setHidden(false);

  const handleMouseLeave = () => {
    const index = Math.floor(Math.random() * answers.length);
    setSelectedAnswer(answers[index]);

    setHidden(true);
  };

  return (
    <Spoiler
      accentColor="hsl(var(--foreground))"
      hidden={hidden}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`${hidden && "opacity-0"}`}>{selectedAnswer}</span>
    </Spoiler>
  );
}
