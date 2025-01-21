import React, { useState } from "react";
import { Modal, Box, Typography, TextField, MenuItem, IconButton } from "@mui/material";
import { SwapHoriz, Close } from "@mui/icons-material";
import { FaCalculator } from "react-icons/fa";

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

  const convertUnits = () => {
    if (!quantity || isNaN(quantity)) return "";
    const convertedValue = (quantity * units[fromUnit]) / units[toUnit];
    return `${quantity} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "gray",
          }}
        >
          <Close />
        </IconButton>

        {/* Calculator Icon */}
        <FaCalculator
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#B55335",
            fontSize: "24px",
          }}
        />

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontFamily: "'Merienda', cursive",
            color: "#B55335",
            fontSize: "24px",
            fontStyle: "bold",
          }}
        >
          Conversion Calculator
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Enter quantity"
          variant="outlined"
          value={quantity}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only numbers, dots, and slashes
            if (/^[0-9./]*$/.test(value)) {
              setQuantity(value);
            }
          }}
          fullWidth
          inputProps={{
            style: { textAlign: "center", fontWeight: "bold", fontSize: "16px" },
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <TextField
            select
            label="From"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            sx={{ width: 100 }}
          >
            {Object.keys(units).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
          <IconButton
            onClick={swapUnits}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              bgcolor: "#B55335",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <SwapHoriz sx={{ fontSize: "24px" }} />
          </IconButton>
          <TextField
            select
            label="To"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            sx={{ width: 100 }}
          >
            {Object.keys(units).map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Result */}
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "#f3f4f6",
            borderRadius: 1,
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {convertUnits() || "Conversion result will appear here"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ConversionModal;
