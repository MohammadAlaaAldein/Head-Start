import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post";
import HrQuestionsImage from "../../images/hr.png";

export default class HrQuestionsPage extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    this.getHrPosts();
  }

  getHrPosts = () => {
    axios
      .get(`http://localhost:9000/get-hr-posts`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  };

  deletePost = _id => {
    axios
      .post("http://localhost:9000/delete-hr-post", { _id })
      .then(res => this.setState({ posts: res.data }));
  };

  render() {
    const HrQuestionsPage = {
      backgroundImage: `url(${HrQuestionsImage})`,
      WebkitBackgroundSize: "cover",
      MozBackgroundSize: "cover",
      OBackgroundSize: "cover",
      backgroundSize: "cover",
      height: "87vh",
      backgroundRepeat: "no-repeat"
    };

    let { role } = this.props.loggedInUser;

    let hrPosts = this.state.posts.map(post => (
      <Post
        key={post._id}
        question={post.question}
        answer={post.answer}
        user_id={post.user_id}
        field={post.field}
        post_id={post._id}
        loggedInUser={this.props.loggedInUser}
        deletePost={this.deletePost}
        page="HrQuestionsPage"
      />
    ));
    return (
      <div>
        <div className="overflow-auto" style={HrQuestionsPage}>
          <div className="container mt-5 md-5 w-75">
            <div className="row py-5 px-4">
              {role === "hrAdmin" ? (
                <Link to="/AddPostPage">
                  <h1 style={{ color: "black" }}>Add post</h1>
                </Link>
              ) : null}
              <br />
              {hrPosts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
