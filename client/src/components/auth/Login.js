import React, { Component } from "react";
import Axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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

  handleSubmit = (e) => {
    e.preventDefault();

    let loggedInUser = {
      email: this.state.email,
      password: this.state.password,
    };

    Axios.post("http://127.0.0.1:5000/api/users/login", {
      email: loggedInUser.email,
      password: loggedInUser.password,
    });
  };

  render() {
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevConnector account
                </p>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.handleChange}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      name="password"
                    />
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
