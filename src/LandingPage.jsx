import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryQuiz from "./CategoryQuiz";
import SpinTheWheel from "./SpinTheWheel";
import landingPageImage from './images/landingPage.png';




const categories = [
  { label: "Breakfast" },
  { label: "Lunch" },
  { label: "Dinner" },
  { label: "Snacks" },
  { label: "Vegan" },
  { label: "Gluten-Free" },
  { label: "Healthy Eating" },
  { label: "Asian" },
  { label: "Ethnic Cuisine" },
  { label: "Comfort Food" },
  { label: "Surprise Me" },
];

const LandingPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setShowRecommendations(true);
    setShowQuiz(false);

    // Redirect to login after 5 seconds
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${landingPageImage})`,
        backgroundSize: "cover", // Ensures the image covers the entire container
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
    backgroundPosition: "center", // Centers the image
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        overflow: "hidden",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          height: "20%",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "0 50px 10px",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            background: "linear-gradient(90deg, #d4856d, #B55335)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: "1",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
            marginBottom: "0",
          }}
        >
          Welcome To
        </h1>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          height: "80%",
          backgroundColor: "#f9f7f4",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "10px 50px",
        }}
      >
        {/* Left Content */}
        <div style={{ flex: 1, textAlign: "left", maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "70px",
              lineHeight: "1",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              marginTop: "0",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #d4856d, #B55335)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Culinar
            </span>
            <span
              style={{
                fontFamily: "'Merienda', cursive",
                fontSize: "100px",
                color: "#B55335",
              }}
            >
              EAT
            </span>
          </h1>
          <div
            style={{
              fontSize: "22px",
              color: "#555",
              lineHeight: "1.8",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <p>
              At <strong>CulinarEAT</strong>, just list the ingredients you have,
              and we’ll help you discover the perfect recipe. Browse through
              diverse categories, rate and comment on your favorite dishes, and
              easily create your shopping list.
            </p>
            <p>
              <strong>CulinarEAT</strong> is here to inspire your next delicious
              creation. Let’s get cooking!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Show Quiz */}
          {showQuiz && (
            <CategoryQuiz
              categories={categories}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {/* Show Recommendations */}
          {showRecommendations && (
            <div
              style={{
                textAlign: "center",
                background: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  color: "#B55335",
                  marginBottom: "10px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Your Recommendations:
              </h2>
              {quizResults.length > 0 ? (
                quizResults.map((result, index) => (
                  <p
                    key={index}
                    style={{
                      fontSize: "20px",
                      color: "#333",
                      margin: "5px 0",
                      fontFamily: "'Arial', sans-serif",
                    }}
                  >
                    {result.label}
                  </p>
                ))
              ) : (
                <p
                  style={{
                    fontSize: "20px",
                    color: "#333",
                    fontFamily: "'Arial', sans-serif",
                  }}
                >
                  No matching categories found. Try again!
                </p>
              )}
              <p
                style={{
                  fontSize: "18px",
                  color: "#B55335",
                  marginTop: "10px",
                  fontStyle: "italic",
                }}
              >
                Redirecting to login in 5 seconds...
              </p>
            </div>
          )}

          {/* Show Wheel */}
          {!showQuiz && !showRecommendations && showWheel && <SpinTheWheel />}

          {/* Default Content */}
          {!showQuiz && !showRecommendations && !showWheel && (
            <>
              <p
                style={{
                  marginTop: "20px",
                  fontStyle: "italic",
                  color: "#B55335",
                  fontSize: "20px",
                  lineHeight: "1.6",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "20px auto",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "36px",
                    fontFamily: "Poppins",
                    display: "block",
                  }}
                >
                  Not sure what to cook?
                </span>
                Try our <strong>quiz</strong> to get personalized recommendations or{" "}
                <span style={{ fontWeight: "bold" }}>spin the wheel</span> for a
                random surprise!
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => setShowQuiz(true)}
                  style={{
                    padding: "15px 40px",
                    borderRadius: "20px",
                    background: "linear-gradient(90deg, #FF7E5F, #FD3A69)",
                    color: "#fff",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  Take the Quiz!
                </button>

                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#B55335",
                  }}
                >
                  OR
                </span>

                <button
                  onClick={() => setShowWheel(true)}
                  style={{
                    padding: "15px 40px",
                    borderRadius: "20px",
                    background: "linear-gradient(90deg, #FF7E5F, #FD3A69)",
                    color: "#fff",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  Spin the Wheel!
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
