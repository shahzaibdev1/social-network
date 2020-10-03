import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  static propTypes = {};
  onDeleteClick = (id) => {
    this.props.deletePost(id);
  };

  onLikeClick = (id) => {
    this.props.addLike(id);
  };

  onUnlikeClick = (id) => {
    this.props.removeLike(id);
  };

  checkUserLike = (likes) => {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { post, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt="Avatar"
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              onClick={() => this.onLikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={`${
                  this.checkUserLike(post.likes)
                    ? "text-info"
                    : "text-secondary"
                } fas fa-thumbs-up`}
              ></i>
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              onClick={() => this.onUnlikeClick(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                onClick={() => this.onDeleteClick(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times"></i>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func,
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deletePost, removeLike, addLike })(
  PostItem
);