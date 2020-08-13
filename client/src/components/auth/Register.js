import React, { Component } from "react";
import Axios from "axios";

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

  // Handle on Register form submit
  handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    Axios.post(`http://127.0.0.1:5000/api/users/register`, newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => this.setState({ errors: err.response.data }));
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

export default Register;
