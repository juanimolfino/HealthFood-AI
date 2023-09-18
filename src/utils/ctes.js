export const finalMsgComplition =
  "With this information, I can use formulas such as the basal metabolism (Basal Metabolic Rate or BMR) calculation and the activity factor to estimate the daily calorie needs. In addition, I will be able to provide you with macronutrient distribution recommendations (proteins, carbohydrates, fats) that adapt to the person's goals and activity level.";

let initialOptions = [
  {
    name: "Age", //* OK
    description: "Select your age range.",
    options: [
      { label: "🧑🏻‍🦱 14-24", value: "Young - range 14-24", selected: false },
      {
        label: "🙎🏻 25-34",
        value: "Young Adults - range 25-34",
        selected: false,
      },
      {
        label: "👨🏽 35-49",
        value: "Middle-Aged Adults - range 35-49",
        selected: false,
      },
      {
        label: "🧔🏻‍♂️ 50-64",
        value: "Mature Adults - range 50-64",
        selected: false,
      },
      {
        label: "👵🏼 >64",
        value: "Senior - Older than sixty four",
        selected: false,
      },
    ],
  },
  {
    name: "Gender identity", //* OK
    description: "How do you identify?",
    options: [
      { label: "♀ Female", value: "Female", selected: false },
      { label: "♂ Male", value: "Male", selected: false },
      { label: "⚧ Other", value: "Other", selected: false },
    ],
  },
  {
    name: "Activity level", //* OK
    description: "How active are you at the moment?",
    options: [
      {
        label: "🛋️ I am not very active",
        value: "Sedentary",
        selected: false,
      },
      {
        label: "🤭 I am active from time to time",
        value: "Light",
        selected: false,
      },
      { label: "🏃🏼 I am often active", value: "Moderate", selected: false },
      { label: "🤸🏼 I am very active", value: "Active", selected: false },
      { label: "⛹🏾‍♀️ I am a professional athlete", value: "Very active", selected: false },
    ],
  },
  {
    name: "Type of Workout Activity", //* OK
    description: "Select the exercise that you usually do",
    options: [
      {
        label: "🏋🏾‍♂️ Gym/Calisthenics",
        value: "Gym, Calisthenics",
        selected: false,
      },
      {
        label: "🏃🏼‍♂️ High-Intensity Interval Training",
        value: "High-Intensity Interval Training",
        selected: false,
      },
      {
        label: "🤸🏼‍♂️ Flexibility/Yoga",
        value: "Flexibility, Yoga",
        selected: false,
      },
      { label: "🚶🏻‍♂️ Light Walking", value: "Light Walking", selected: false },
      {
        label: "🚴🏼 Cardiovascular Training",
        value: "Cardiovascular Training",
        selected: false,
      },
      { label: "🏊🏽‍♂️ Swimming", value: "Swimming", selected: false },
    ],
  },
  {
    name: "Workout quantity", //* OK
    description: "How many times a week?",
    options: [
      { label: "1", value: "1 a week", selected: false },
      { label: "2", value: "2 a week", selected: false },
      { label: "3", value: "3 a week", selected: false },
      { label: "4", value: "4 a week", selected: false },
      { label: "5", value: "5 a week", selected: false },
      { label: ">5", value: "More than five a week", selected: false },
    ],
  },
  {
    name: "Workout time", //* OK
    description: "About how long per day?",
    options: [
      { label: "30 min", value: "0.5 hour", selected: false },
      { label: "1 hour", value: "1 hour", selected: false },
      { label: "1.5 hours", value: "90 minutes", selected: false },
      { label: "2 hours", value: "2 hours", selected: false },
      { label: "2.5 hours", value: "150 minutes", selected: false },
      { label: "3 hours", value: "3 hours", selected: false },
      { label: "4 hours", value: "4 hours", selected: false },
      { label: "5 hours", value: "5 hours", selected: false },
      { label: "6 hours", value: "6 hours", selected: false },
      { label: "7 hours", value: "7 hours", selected: false },
      { label: "8 hours", value: "8 hours", selected: false },
      { label: "9 hours", value: "9 hours", selected: false },
    ],
  },
  {
    name: "Target", //* OK
    description: "What is your main goal?",
    options: [
      { label: "⛹🏻 Weight Loss", value: "Weight Loss (0.5kg per week)", selected: false },
      {
        label: "🧘🏻‍♀️ Maintenance weight",
        value: "Maintenance weight",
        selected: false,
      },
      {
        label: "🏋🏻 Muscle mass gain",
        value: "Muscle mass gain",
        selected: false,
      },
      {
        label: "🚴🏼 Cardiovascular Fitness",
        value: "Cardiovascular Fitness",
        selected: false,
      },
    ],
  },
  {
    name: "Dietary Preferences", //* OK
    description: "What is your dietary preferences?",
    options: [
      { label: "🥦 Vegetarianism", value: "Vegetarianism", selected: false },
      { label: "🥑 Veganism", value: "Veganism", selected: false },
      {
        label: "🐟 Pescetarianism",
        value: "Pescetarianism",
        selected: false,
      },
    ],
  },
  {
    name: "Food preferences", //* OK
    description: "Do you have a preference for certain types of food?",
    options: [
      { label: "🐓 Lean Proteins", value: "Lean Proteins", selected: false },
      {
        label: "🍚 Complex Carbohydrates",
        value: "Complex Carbohydrates",
        selected: false,
      },
      { label: "🥑 Healthy Fats", value: "Healthy Fats", selected: false },
      {
        label: "🥛 Dairy and Alternatives",
        value: "Dairy and Alternatives",
        selected: false,
      },
      {
        label: "🍚 Simple Carbohydrates",
        value: "Simple Carbohydrates",
        selected: false,
      },
      {
        label: "🥗 Green Vegetables",
        value: "Green Vegetables",
        selected: false,
      },
      {
        label: "🫘 Legumes and Beans",
        value: "Legumes and Beans",
        selected: false,
      },
      { label: "🥣 Whole Foods", value: "Whole Foods", selected: false },
      {
        label: "🍲 Balanced macronutrients",
        value: "Balanced macronutrients",
        selected: false,
      },
      {
        label: "🥕 High-Fiber Foods",
        value: "High-Fiber Foods",
        selected: false,
      },
      {
        label: "🥩 High-Protein Foods",
        value: "High-Protein Foods",
        selected: false,
      },
    ],
  },
  {
    name: "Food intolerances", //* OK
    description: "Do you have food intolerance?",
    options: [
      {
        label: "🚫 Lactose 🥛",
        value: "Lactose intolerance",
        selected: false,
      },
      { label: "🚫 Gluten 🍞", value: "Gluten intolerance", selected: false },
      {
        label: "🚫 Fructose 🍎",
        value: "Fructose intolerance",
        selected: false,
      },
      {
        label: "🚫 Galactose 🍎",
        value: "Galactose intolerance",
        selected: false,
      },
    ],
  },
  {
    name: "Food Allergies", //* OK
    description: "Do you have some Food Allergies?",
    options: [
      { label: "🥜 Walnuts", value: "Walnuts allergy", selected: false },
      { label: "🥛 Milk", value: "Milk allergy", selected: false },
      { label: "🥚 Egg", value: "Egg allergy", selected: false },
      { label: "🥜 Peanut", value: "Peanut allergy", selected: false },
      { label: "🌰 Almond", value: "Almond allergy", selected: false },
      { label: "🌾 Wheat", value: "Wheat allergy", selected: false },
      { label: "🌰 Dry fruits", value: "Dry fruits allergy", selected: false },
      { label: "🍤 Seafood", value: "Seafood allergy", selected: false },
      { label: "🐠 Fish", value: "Fish allergy", selected: false },
      { label: "🥢 Soy", value: "Soy allergy", selected: false },
      { label: "🌭 Mustard", value: "Mustard allergy", selected: false },
    ],
  },
  {
    name: "Kitchen level", //* OK
    description: "What skill level do you have in the kitchen?",
    options: [
      { label: "📚 New", value: "New", selected: false },
      { label: "👩‍🍳 Intermediate", value: "Intermediate", selected: false },
      { label: "👩‍🔬 Expert", value: "Expert", selected: false },
    ],
  },
  {
    name: "Time available for cooking", //* OK
    description:
      "Are you willing to prepare more elaborate meals or do you prefer simple and quick options?",
    options: [
      {
        label: "🧘🏽 I have time and enjoy the moment",
        value: "Without time restrictions",
        selected: false,
      },
      {
        label: "🥗 Fast, simple and healthy food",
        value: "Fast, simple and healthy food",
        selected: false,
      },
    ],
  },
  {
    name: "Preferencies", //* OK
    description: "Do you want to use some food that you have in your fridge?",
    options: [
      { label: "🐓 Chicken", value: "Chicken", selected: false },
      { label: "🥑 Avocado", value: "Avocado", selected: false },
      { label: "🥖 Bread", value: "Bread", selected: false },
      {
        label: "🍞 Wholemeal bread",
        value: "Wholemeal bread",
        selected: false,
      },
      { label: "🥦 Broccoli", value: "Broccoli", selected: false },
      { label: "🧈 Butter", value: "Butter", selected: false },
      { label: "🥕 Carrot", value: "Carrot", selected: false },
      { label: "🧀 Cheese", value: "Cheese", selected: false },
      { label: "🌽 Corn", value: "Corn", selected: false },
      { label: "🥒 Cucumber", value: "Cucumber", selected: false },
      { label: "🥚 Egg", value: "Egg", selected: false },
      { label: "🍆 Eggplant", value: "Eggplant", selected: false },
      { label: "🐟 Fish", value: "Fish", selected: false },
      { label: "🧄 Garlic", value: "Garlic", selected: false },
      { label: "🍯 Honey", value: "Honey", selected: false },
      { label: "🍋 Lemon", value: "Lemon", selected: false },
      { label: "🥬 Lettuce", value: "Letucce", selected: false },
      { label: "🥬 Spinach", value: "Spinach", selected: false },
      { label: "🥩 Meat", value: "Meat", selected: false },
      { label: "🥛 Milk", value: "Milk", selected: false },
      { label: "🍄 Mushroom", value: "Mushroom", selected: false },
      { label: "🫒 Olive", value: "Olive", selected: false },
      { label: "🧅 Onion", value: "Onion", selected: false },
      { label: "🍊 Orange", value: "Orange", selected: false },
      { label: "🥜 Peanuts", value: "Peanuts", selected: false },
      { label: "🌶️ Pepper", value: "Pepper", selected: false },
      { label: "🥔 Potato", value: "Potato", selected: false },
      { label: "🍚 Rice", value: "Rice", selected: false },
      { label: "🍤 Shrimp", value: "Shrimp", selected: false },
      { label: "🍝 Spaghetti", value: "Spaghetti", selected: false },
      { label: "🍅 Tomato", value: "Tomato", selected: false },
    ],
  },
];

export default initialOptions;
