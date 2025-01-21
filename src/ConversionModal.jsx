import React, { useState } from "react";

const units = {
  ml: 1,
  l: 1000,
  tsp: 5,
  tbs: 15,
  oz: 28.41,
  cup: 250,
  pt: 568.26,
  qt: 1136.52,
  g: 1,
  kg: 1000,
};

const ConversionModal = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState("");
  const [fromUnit, setFromUnit] = useState("ml");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState(null);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
  
    // Regular expression to allow numbers, decimals, and fractions
    const validInput = /^[0-9]*(\/[0-9]*)?(\.[0-9]*)?$/;
  
    if (value === '' || validInput.test(value)) {
      setQuantity(value); // Update state only if input is valid
    } else {
      console.log('Invalid input: only numbers, "/", and "." are allowed.');
    }
  };
  

  const convertUnits = () => {
    if (!quantity) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    // Parse fractions into decimal
    const parsedQuantity = quantity.includes("/")
      ? eval(quantity) // Convert "1/2" into 0.5 using eval (or implement a custom parser)
      : parseFloat(quantity);
  
    if (isNaN(parsedQuantity)) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    const convertedValue = (parsedQuantity * units[fromUnit]) / units[toUnit];
    setResult(convertedValue.toFixed(2));
  };
  

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Conversion Calculator</h2>
        <div style={styles.form}>
        <input
  type="text"
  placeholder="Enter quantity (e.g., 1, 1.5, or 1/2)"
  value={quantity}
  onChange={handleQuantityChange}
  style={styles.input}
/>

          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            style={styles.select}
          >
            {Object.keys(units).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            style={styles.select}
          >
            {Object.keys(units).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <button onClick={convertUnits} style={styles.convertButton}>
          Convert
        </button>
        {result && (
          <p style={styles.result}>
            {quantity} {fromUnit} = {result} {toUnit}
          </p>
        )}
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#8B4513",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  convertButton: {
    padding: "10px 20px",
    backgroundColor: "#B55335",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
  },
  closeButton: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ConversionModal;
