import React, { Component } from "react";
import Friend from "./Friend";
import { Grid, Typography, Input, Button } from "@material-ui/core";
const axios = require("axios");

export default class FriendList extends Component {
  state = {
    friends: [],
    friend: {
      name:'',
      email:'',
      age:''
    }
  };
  async componentDidMount() {
    const res = await axios("http://localhost:5000/api/friends", {
      headers: { authorization: this.props.storage }
    });
    const friends = res.data;
    this.setState(prev => ({ ...prev, friends }));
  }
  handleSubmit = async e => {
    e.preventDefault();
    try {
      const friend = this.state.friend;
      const res = await axios.post(
        "http://localhost:5000/api/friends",
        friend,
        {
          headers: { authorization: this.props.storage }
        }
      );
      const friends = res.data;
      this.setState(prev => ({ ...prev, friends }));
      this.setState(prev => ({...prev,friend:{name:'',age:'',email:''}}))
    } catch (er) {
      console.log(er);
    }
    
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(prev => ({ ...prev, friend: {...prev.friend, [name]: value } }));
  };
  render() {
    return (
      <>
        <Typography variant="h1">Create a Friend</Typography>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Enter a Name"
            value={this.state.friend.name}
            type="text"
            onChange={this.handleChange}
            name='name'
            required
          />
          <Input
            placeholder="Enter an Email"
            value={this.state.friend.email}
            type="email"
            onChange={this.handleChange}
            name='email'
            required
          />
          <Input
            placeholder="Enter an Age"
            value={this.state.friend.age}
            type="number"
            onChange={this.handleChange}
            name='age'
            required
          />
          <Button color="primary" variant="contained" type="submit">
            Add Friend
          </Button>
        </form>
        <Typography variant="h1">My Friends</Typography>
        <Grid container justify="space-between">
          {this.state.friends.map(friend => (
            <Friend friend={friend} key={friend.id} />
          ))}
        </Grid>
      </>
    );
  }
}
