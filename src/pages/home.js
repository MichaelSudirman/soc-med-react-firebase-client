import React, { Component } from "react";
import axios from "axios";
// Material UI imports
import Grid from "@material-ui/core/Grid";
// Components
import Post from '../components/Post'
import Profile from '../components/Profile'

export class home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPostsMarkUp = this.state.posts ? (
      this.state.posts.map(post => <Post key={post.postId} post={post}/>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkUp}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

export default home;
