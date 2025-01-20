import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from './images/backgroundLPage.png';
import CategoryQuiz from "./CategoryQuiz";
import SpinTheWheel from "./SpinTheWheel";

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("Let's Find Your Perfect Dish!");
  const [subContent, setSubContent] = useState("Calculating your recommendations...");
  const [redirectMessage, setRedirectMessage] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const navigate = useNavigate();

  const handleQuizComplete = (results) => {
    setShowQuiz(false);
    setPopupContent("Your Recommendations are:");
    setSubContent("Calculating your recommendations...");
    setRedirectMessage("");
    setShowPopup(true);

    setTimeout(() => {
      const recommendations =
        results.length > 0
          ? results.map((res) => res.label).join(", ")
          : "No matching categories found. Try again!";
      setSubContent(`${recommendations}`);
      setRedirectMessage("Redirecting to login page in 5 seconds...");

      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 5000);
    }, 2000);
  };

  const handleSpinComplete = (recommendation) => {
    setShowWheel(false);
    setPopupContent("Your Recommendation:");
    setSubContent(`Selected Category: ${recommendation}`);
    setRedirectMessage("");

    setShowPopup(true);

    setTimeout(() => {
      setSubContent("Redirecting to login page in 5 seconds...");
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 5000);
    }, 2000);
  };

  return (
    <div
    style={{
      height: "100vh",
      width: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "flex-start",
      margin: 0,
      padding: 0,
      overflowX: "hidden", // Prevent horizontal scrolling
      boxSizing: "border-box", // Include padding and borders in width calculation
    }}
  >
  
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            textAlign: "center",
            fontSize: "18px",
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#B55335" }}>
            {popupContent}
          </h3>
          <p>{subContent}</p>
          {redirectMessage && (
            <p
              style={{
                fontSize: "16px",
                color: "#555",
                marginTop: "10px",
                fontStyle: "italic",
              }}
            >
              {redirectMessage}
            </p>
          )}
        </div>
      )}

      {showQuiz && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          
            padding: "20px",
            borderRadius: "10px",
           
            zIndex: 1000,
          }}
        >
          <CategoryQuiz
            onComplete={handleQuizComplete}
            categories={categories}
          />
        </div>
      )}

      {showWheel && (
        <div
          style={{
            position: "absolute",
            top: "375px",
            left: "1320px",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f9f7f4",
            padding: "20px",
            borderRadius: "10px",
            width:"647px",
            //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            
          }}
        >
          <SpinTheWheel onSpinComplete={handleSpinComplete} />
        </div>
      )}

<div
  style={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
    marginRight: "80px",
    marginTop: "400px",
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

  <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>OR</p>

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

<p

  onClick={() => navigate("/login")}
  style={{
    marginTop: "40px",
    fontSize: "14px",
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "left", // Align the text to the left
    alignSelf: "flex-start", // Align the element itself to the left
    marginLeft: "1230px", // Add space from the left side of the container
  }}
>
  Navigate to the login page
</p>
<p
  onClick={() => navigate("/home")}
  style={{
    marginTop: "10px",
    fontSize: "14px",
    color: "black",
   // textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "left", // Align the text to the left
    alignSelf: "flex-start", // Align the element itself to the left
    marginLeft: "1260px", // Add space from the left side of the container
  }}
>
  Continue as a guest
</p>



    </div>
  );
};

export default LandingPage;
