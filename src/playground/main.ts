import { generateText } from "ai";

import { google } from "@ai-sdk/google";

const model = google("gemini-2.5-flash");

export const answerMyQuestion = async (question: string) => {
  const { text } = await generateText({
    model,
    prompt: question,
  });
  return text;
};

const answer = await answerMyQuestion(
  "What is the shortest executable program?"
);

console.log(answer);
