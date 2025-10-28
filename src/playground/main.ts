import { generateText, streamText } from "ai";

import { google } from "@ai-sdk/google";

const model = google("gemini-2.5-flash");

export const answerMyQuestion = async (question: string) => {
  const { text } = await generateText({
    model,
    prompt: question,
  });
  return text;
};

export const streamMyQuestion = async (question: string) => {
  const { textStream, text } = await streamText({
    model,
    prompt: question,
  });
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
  return text;
};

// Example usage
const question =
  "How can AI be applied to agriculture in developing countries?";
await streamMyQuestion(question);
