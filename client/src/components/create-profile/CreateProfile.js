import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      instagram: "",
      errors: {},
    };
  }
  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-8">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some info to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(null)(CreateProfile);
