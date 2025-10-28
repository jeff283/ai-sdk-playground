import { generateText, streamText } from "ai";

import { google } from "@ai-sdk/google";

// Add the env variable GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file
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

export const systemPromptAnswerQuestion = async (question: string) => {
  const systemPrompt =
    "You are an expert in agriculture and sustainable development.";
  const { text } = await generateText({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ],
  });
  return text;
};

// Example usage
const question =
  "How can access to AI tools be democratized to benefit smallholder farmers in developing countries?";

const answer = await systemPromptAnswerQuestion(question);
console.log("Answer: \n", answer);
