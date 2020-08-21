import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
                  <TextFieldGroup
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    name="name"
                    error={errors.name}
                  />

                  <TextFieldGroup
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    error={errors.email}
                    children={
                      <small className="form-text text-muted">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                      </small>
                    }
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    error={errors.password}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                  />

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
