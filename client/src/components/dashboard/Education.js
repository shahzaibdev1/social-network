import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onClickDelete = (id) => {
    this.props.deleteEducation(id);
  };

  render() {
    console.log(this.props.education);
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {/* {edu.from} - {edu.to} */}
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Current"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onClickDelete.bind(edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <div className="table-responsive-sm table-responsive-xs">
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Title</th>
                <th>Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(withRouter(Education));
