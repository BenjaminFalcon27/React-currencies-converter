import React from "react";

const CurrencySelect = ({ label, value, onChange, options }) => (
  <div className="col s6">
    <label>{label}</label>
    <select
      defaultValue={value}
      className="browser-default"
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CurrencySelect;
