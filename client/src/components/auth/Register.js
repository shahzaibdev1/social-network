import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  // Handle on Register form submit
  handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    let { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form noValidate onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control form-control-lg ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                    {errors.name ? (
                      <div className="invalid-feedback">{errors.name}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control form-control-lg ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Email Address"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                    {errors.email ? (
                      <div className="invalid-feedback">{errors.email}</div>
                    ) : (
                      ""
                    )}
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control form-control-lg ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                    {errors.password ? (
                      <div className="invalid-feedback">{errors.password}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control form-control-lg ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={this.handleChange}
                      value={this.state.confirmPassword}
                    />
                    {errors.confirmPassword ? (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
