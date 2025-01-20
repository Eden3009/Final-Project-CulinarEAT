import React, { useState } from "react";

const questions = [
  {
    question: "What vibe are you going for in your meal?",
    options: [
      "Comforting and hearty",
      "Light and refreshing",
      "Bold and adventurous",
      "Fun and playful",
    ],
  },
  {
    question: "How much time do you want to spend in the kitchen?",
    options: [
      "Just a few minutes (I’m in a rush!)",
      "Around 20-30 minutes (quick and easy)",
      "Up to an hour (I enjoy cooking!)",
      "I’ve got all day (let’s get creative!)",
    ],
  },
  {
    question: "What’s the star ingredient of your meal?",
    options: [
      "Something green and healthy (like veggies)",
      "Something rich and hearty (like beef or pasta)",
      "Something fresh and light (like fish or fruit)",
      "Something unexpected (let’s surprise ourselves!)",
    ],
  },
  {
    question: "What’s your comfort food go-to?",
    options: [
      "A warm soup or stew",
      "A classic pasta dish",
      "A sweet dessert to end the day",
      "Crispy snacks or finger foods",
    ],
  },
  {
    question: "What’s your ultimate food goal?",
    options: [
      "To eat healthier without sacrificing flavor",
      "To save time while still eating well",
      "To impress someone with my cooking skills",
      "To try something completely new and exciting",
    ],
  },
  {
    question: "How do you feel about cooking?",
    options: [
      "It’s fun and relaxing for me",
      "It’s just a means to an end (feed me fast!)",
      "It’s my way of showing love to others",
      "It’s a creative outlet for me",
    ],
  },
];

const recommendationsMapping = {
  "Comforting and hearty": ["Comfort Food", "Soups"],
  "Light and refreshing": ["Healthy Eating", "Vegan"],
  "Bold and adventurous": ["Ethnic Cuisine", "Asian"],
  "Fun and playful": ["Snacks", "Party Foods"],
  "Just a few minutes (I’m in a rush!)": ["Quick Meals", "Budget-Friendly"],
  "Around 20-30 minutes (quick and easy)": ["Quick Meals", "Weeknight Dinners"],
  "Up to an hour (I enjoy cooking!)": ["Pasta", "Meals for Date"],
  "I’ve got all day (let’s get creative!)": ["Comfort Food", "Holiday Meals"],
  "Something green and healthy (like veggies)": ["Vegan", "Vegetarian"],
  "Something rich and hearty (like beef or pasta)": ["Comfort Food", "Beef"],
  "Something fresh and light (like fish or fruit)": ["Fish & Seafood", "Healthy Eating"],
  "Something unexpected (let’s surprise ourselves!)": ["Ethnic Cuisine", "Asian"],
  "A warm soup or stew": ["Soups", "Comfort Food"],
  "A classic pasta dish": ["Pasta", "Italian"],
  "A sweet dessert to end the day": ["Desserts", "Baking"],
  "Crispy snacks or finger foods": ["Snacks", "Party Foods"],
  "To eat healthier without sacrificing flavor": ["Healthy Eating", "Gluten-Free"],
  "To save time while still eating well": ["Quick Meals", "Budget-Friendly"],
  "To impress someone with my cooking skills": ["Meals for Date", "Holiday Meals"],
  "To try something completely new and exciting": ["Ethnic Cuisine", "Asian"],
  "It’s fun and relaxing for me": ["Comfort Food", "Soups"],
  "It’s just a means to an end (feed me fast!)": ["Quick Meals", "Snacks"],
  "It’s my way of showing love to others": ["Holiday Meals", "Meals for Date"],
  "It’s a creative outlet for me": ["Baking", "Desserts"],
};

const CategoryQuiz = ({ categories = [], onComplete = () => {} }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers, answer];
    setSelectedAnswers(updatedAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Generate recommendations based on answers
      const recommendations = updatedAnswers.flatMap(
        (answer) => recommendationsMapping[answer] || []
      );

      // Limit recommendations to top 2 relevant categories
      const uniqueRecommendations = [...new Set(recommendations)].slice(0, 2);

      onComplete(
        uniqueRecommendations.map((label) => ({ label })) // Format as objects
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally on the screen
        alignItems: "flex-start", // Align to the top
        width: "100%",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        position: "relative",
        overflowX:"hidden",
      }}
    >
     <div
  style={{
    position: "fixed", // Ensures the position is fixed on the viewport
    right: "-790px", // Adjust alignment to the right
    top: "155px", // Fixed position from the top
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#f9f7f4", // Beige color
    borderRadius: "10px",
    width: "590px", // Set a fixed width to avoid dynamic changes
    padding: "43px",
    height: "440px", // Ensures content fits dynamically without shifting position
    overflow: "hidden", // Avoids overflow issues
  }}
>


        {/* Headline */}
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#B55335",
            textAlign: "left",
            marginBottom: "20px",
            marginRight: "60px",
            lineHeight: "1.5",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Let's Find Your Perfect Dish!
        </h2>

        <h3
          style={{
            fontSize: "22px",
            fontWeight: "500",
            color: "#555",
            textAlign: "left",
            marginBottom: "30px",
            lineHeight: "1.5",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {questions[currentQuestionIndex].question}
        </h3>

        {/* Answer Options */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 2 columns for a grid layout
            gap: "20px", // Proper spacing between cards
            justifyContent: "center", // Center-align the grid
            alignItems: "center", // Align vertically
            width: "70%",
          }}
        >
          {questions[currentQuestionIndex].options.map((option) => (
            <div
              key={option}
              onClick={() => handleAnswer(option)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg, #d4856d, #B55335)",
                color: "#fff",
                borderRadius: "15px",
                width: "180px",
                height: "140px",
                cursor: "pointer",
                fontSize: "22px",

                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg,rgb(216, 160, 143),rgb(170, 89, 66))")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(90deg, #d4856d,rgb(205, 165, 152))")
              }
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryQuiz;
