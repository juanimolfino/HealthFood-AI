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
    temperature: 0.9,
    max_tokens: 2000,
    prompt: generatePrompt(language, selectedOptions, height, weight),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

function generatePrompt(language, selectedOptions, height, weight) {
  let prompt = `Generate 3 differents healthy food recipe ideas (breakfast, lunch and dinner) with the following strict characteristics: Height: ${height}cm \n Weight: ${weight}kg \n ${selectedOptions.map(
    (option) => ` ${option.name}: ${option.options}`
  )}.
  Return the answer in ${language} and must be in HTML format with css inline like the following example

    <h1 class="font-bold mt-3 mx-0 mb-1">💡 Dish name: </h1>
    <h1 class="font-bold mt-2 mx-0 mb-1">🥗 Description: </h1>
    <div><h1 class="font-bold mt-2 mx-0 mb-1">✅ Ingredients</h1><ul class="m-0"></ul></div> (show in a list with quantity and weight)
    <h1 class="font-bold mt-2 mx-0 mb-1">📖 How to make it</h1> (show in a list with steps) 
    🔥 Calories per dish

    🍽️ Calories per day recommended for you (exemple use BMR multiply by the Harris-Benedict factor activity)`;

  return prompt;
}

// [b]🥗 Description/b]
//   [b]✅ Ingredients/b]
//   [b]📖 How to make it/b]
//   [b]🔥 Dish calories/b]

// The format for each of the points should be as follows:

//   The <h1> tag is used to indicate the title of the point, and the description of the point is written below it.

//   <h1>💵 Title of the point</h1>
//   Description of the point

// At a minimum, the answer must have the following items:

// 💡 Dish name
// /n
// 🥗 Description: (short)
// /n
// ✅ Ingredients: (with quantities for this dish)
// /n
// 📖 How to make it
// /n
// 🔥 Dish calories
// /n

// The format for each item should be as follows:

// The bb tag is used to indicate the title of the item.

// [b]💡 Dish name[/b]

// Calculate the calories that this person must to eat per day using the Basal Metabolic Rate and the Harris-benedict method.
// The recommendation of these three dishes must be made with the calories that this person should consume in a day according to the calculation method used (basal metabolic rate and Harris-Benedict method).



// Give me a complete detail of the dish, for one person, also a list summary of ingredients and their quantity specifying weight and units in the same line, also step to step to make it and Nutrition Facts per dish.
// At the final of completion, Calculate BMR (using age, gender, weight, height) multiply your BMR by the activity factor the Harris-Benedict formula (using activity level and target) following the same characteristics, and give the information at final of complition. 
