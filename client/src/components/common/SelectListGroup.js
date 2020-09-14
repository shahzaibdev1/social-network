import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, options, onChange }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        value={value}
        onChange={onChange}
        name={name}
      >
        {selectOptions}
      </select>
      {error ? <div className="invalid-feedback">{error}</div> : ""}
      {info ? <small className="form-text text-muted"></small> : ""}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
