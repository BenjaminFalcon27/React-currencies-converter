import React, { useState } from "react";
import "../assets/App.css";

const AmountInput = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/^0+(?=\d)/, "");
    const isValidInput = /^\d*$/.test(numericValue);
    setIsValid(isValidInput);

    onChange({
      target: {
        value: numericValue || "0",
      },
    });
  };

  return (
    <div className={`input-field col s12 ${isValid ? "valid" : "invalid"}`}>
      <input
        id="amount"
        type="text"
        className=""
        value={value}
        onChange={handleInputChange}
      />
      {isValid ? (
        <span className="helper-text" data-success="Valide">
          Saisie valide
        </span>
      ) : (
        <span className="helper-text" data-error="Erreur">
          Saisie invalide
        </span>
      )}
      <label htmlFor="amount">Montant</label>
    </div>
  );
};

export default AmountInput;
