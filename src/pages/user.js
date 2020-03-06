import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// Redux
import { connect } from "react-redux";
import { getUserPageData } from "../redux/actions/dataActions";
// Components and utils
import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";
// Material UI core imports
import Grid from "@material-ui/core/Grid";

class user extends Component {
  state = {
    profile: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserPageData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err.response.data));
  }
  render() {
    const { posts, loading } = this.props.data;
    const postsMarkup = loading ? (
      <p>loading data...</p>
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : (
      posts.map(post => <Post key={post.postId} post={post} />)
    );

    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserPageData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserPageData })(user);
