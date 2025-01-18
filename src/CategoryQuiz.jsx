import React, { useState } from "react";

const questions = [
  {
    question: "What time of day are you cooking for?",
    options: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  },
  {
    question: "Do you have any dietary preferences?",
    options: ["Vegan", "Gluten-Free", "Healthy Eating", "None"],
  },
  {
    question: "Are you in the mood for a specific cuisine?",
    options: ["Asian", "Ethnic Cuisine", "Comfort Food", "Surprise Me"],
  },
];

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
      // All questions answered
      const filteredCategories = categories.filter((category) =>
        updatedAnswers.some(
          (answer) => category.label?.toLowerCase() === answer.toLowerCase()
        )
      );

      const results =
        filteredCategories.length > 0
          ? filteredCategories
          : [{ label: "No matching categories found. Try again!" }];

      onComplete(results); // Pass results to the parent (LandingPage)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f9f7f4",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "0 auto",
        overflow: "hidden",
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
          width: "100%",
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
              width: "160px",
              height: "120px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #B55335, #9C442C)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #d4856d, #B55335)")
            }
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryQuiz;
