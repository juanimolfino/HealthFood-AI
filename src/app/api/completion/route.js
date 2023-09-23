import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req) {
  const { prompt } = await req.json();
  console.log("soy el propmt", prompt);

  const { language, height, weight, selectedOptions } = prompt;

  if (!openai.apiKey) {
    NextResponse.json({
      error:
        "OpenAI API key not configured, please follow instructions in README.md",
      status: 500,
    });
    return;
  }

  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: true,
    temperature: 0.7,
    max_tokens: 3000,
    prompt: generatePrompt(language, selectedOptions, height, weight),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

function generatePrompt(language, selectedOptions, height, weight) {
  let prompt = `Generate 3 differents healthy food recipe ideas (breakfast, lunch and dinner) with the following strict characteristics: Height: ${height}cm \n Weight: ${weight}kg \n ${selectedOptions.map(
    (option) => ` ${option.name}: ${option.options}`
  )}, and Calories per day recommended for these characteristics using BMR multiply by the Harris-Benedict factor activity.

  Return the answer in ${language} (titles and text) and must be in HTML format with css inline like the following example.

    <div class="my-2"><h1 class="font-bold mt-3 mx-0 mb-1">💡 Dish name: </h1></div>
    <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">🥗 Description: (short description)</h1></div>
    <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">✅ Ingredients:</h1><ul class="m-0"></ul></div> (show in a list with quantity and weight)
    <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">📖 How to make it: (in list format)</h1></div>
    <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">🔥 Calories per dish:</h1></div>
    <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">🍽️ Calories per day recommended: (using person characteristics)</h1></div>
`;

    console.log(prompt)

  return prompt;
}

{/* <div class="my-2"><h1 class="font-bold mt-2 mx-0 mb-1">🍽️ Calories per day recommended: (BMR multiply by the Harris-Benedict for these strict characteristics: Height: ${height}cm, Weight: ${weight}kg, Gender: ${selectedOptions[1].options}, Age: ${selectedOptions[0].options}, Activity:${selectedOptions[2].options} )</h1></div> */}
