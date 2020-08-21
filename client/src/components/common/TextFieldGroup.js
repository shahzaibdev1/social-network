import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  children,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <div className="invalid-feedback">{error}</div> : ""}
      {children}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChanged: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  children: PropTypes.any,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
