import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsSpun(true);
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
          onStopSpinning={() => setMustSpin(false)}
        />
      </div>

      {/* Spin the Wheel Button */}
      <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        style={{
          padding: "15px 40px", // Adjusted to match the "good" button
          borderRadius: "20px", // Slightly rounded corners
          background: mustSpin
            ? "#ccc"
            : "linear-gradient(90deg,rgba(203, 75, 42, 0.8),rgb(190, 151, 140))", // Gradient for vibrant look
          color: "#fff",
          border: "none",
          fontSize: "20px", // Larger font for emphasis
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          cursor: mustSpin ? "not-allowed" : "pointer",
          transition: "transform 0.2s ease, box-shadow 0.3s ease",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)"; // Hover scaling effect
          e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)"; // Enhanced shadow on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)"; // Reset scaling
          e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)"; // Reset shadow
        }}
      >
        {mustSpin ? "Spinning..." : "Spin the Wheel!"}
      </button>

      {/* Selected Category Text */}
      {isSpun && !mustSpin && prizeNumber !== null && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          🎉 Selected Category:{" "}
          <span style={{ color: "#B55335" }}>{data[prizeNumber].option}</span>
        </p>
      )}
    </div>
  );
};

export default SpinTheWheel;
