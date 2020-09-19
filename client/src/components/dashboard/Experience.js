import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onClickDelete = (id) => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          {/* {exp.from} - {exp.to} */}
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Current"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onClickDelete.bind(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <div className="table-responsive-sm table-responsive-xs">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Title</th>
                <th scope="col">Years</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{experience}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(withRouter(Experience));
