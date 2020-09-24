import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { fetchProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.fetchProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = <h1>Profiles </h1>;
      } else {
        profileItems = <h4>No Profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Other Profiles</h1>
              <p className="lead text-center">Browse and connect with others</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  fetchProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchProfiles })(Profiles);
