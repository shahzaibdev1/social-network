import React from "react";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  options,
  onChange,
  children,
}) => {
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
      {info ? <small className="form-text text-muted"></small> : ""}
      {error ? <div className="invalid-feedback">{error}</div> : ""}
      {children}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectListGroup;
