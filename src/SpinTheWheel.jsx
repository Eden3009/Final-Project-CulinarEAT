import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";

const data = [
  { option: "Breakfast" },
  { option: "Lunch" },
  { option: "Dinner" },
  { option: "Snacks" },
  { option: "Vegan" },
  { option: "Vegetarian" },
  { option: "Pasta" },
  { option: "Chicken" },
  { option: "Beef" },
  { option: "Desserts" },
  { option: "Rice" },
  { option: "Sea Food" },
];

const SpinTheWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [isSpun, setIsSpun] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsSpun(false);
    setRedirecting(false);
  };

  const handleSpinEnd = () => {
    setMustSpin(false);
    setIsSpun(true);

    // After showing the category, display the redirecting message
    setTimeout(() => {
      setRedirecting(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000); // Wait 5 seconds before redirecting
    }, 2000); // Show the selected category for 2 seconds before redirecting message
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "-20px",
      }}
    >
      {/* Heading Section */}
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          color: "#B55335",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Let Fate Decide Your Menu Today!
      </h2>

      {/* Wheel Section */}
      <div
        style={{
          transform: "scale(0.8)", // Adjust scale for size
          transformOrigin: "center",
          marginBottom: "-30px", // Shift the wheel closer to the content above
        }}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={["#eec6b8", "#ffffff"]}
          textColors={["#333333", "#333333"]}
          outerBorderColor="#333"
          outerBorderWidth={3}
          innerBorderColor="#333"
          innerBorderWidth={1}
          radiusLineColor="#333"
          radiusLineWidth={2}
          onStopSpinning={handleSpinEnd}
        />
      </div>

      {/* Spin the Wheel Button */}
      <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        style={{
          padding: "15px 40px",
          borderRadius: "20px",
          background: mustSpin
            ? "#ccc"
            : "linear-gradient(90deg,rgba(203, 75, 42, 0.8),rgb(190, 151, 140))",
          color: "#fff",
          border: "none",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          cursor: mustSpin ? "not-allowed" : "pointer",
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
        {mustSpin ? "Spinning..." : "Spin the Wheel!"}
      </button>

      {/* Selected Category and Redirecting Message */}
      {isSpun && !mustSpin && prizeNumber !== null && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            🎉 Selected Category:{" "}
            <span style={{ color: "#B55335" }}>{data[prizeNumber].option}</span>
          </p>
          {redirecting && (
            <p
              style={{
                marginTop: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#B55335",
              }}
            >
              Redirecting to login page in 5 seconds...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpinTheWheel;
