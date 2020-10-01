import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        {exp.location ? (
          <span>
            <strong>Location: </strong>
            {exp.location}
          </span>
        ) : (
          ""
        )}

        {exp.description ? (
          <p>
            <strong>Description: </strong>
            {exp.description}
          </p>
        ) : (
          ""
        )}
      </li>
    ));

    const eduItems = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>

        {edu.description ? (
          <span>
            <strong>Description: </strong>
            {edu.description}
          </span>
        ) : (
          ""
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            "No experience listed"
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            "No Education listed"
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
