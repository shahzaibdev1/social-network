import React from "react";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,

  onChange,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={`form-control form-control-lg ${error ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <div className="invalid-feedback">{error}</div> : ""}
      {info ? <small className="form-text text-muted"></small> : ""}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
