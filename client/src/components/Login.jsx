import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import { Browser as Bowser } from "react-kawaii";

const axios = require("axios");

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false,
    BowserProps: {
      size: 200,
      color: "green",
      mood: "happy"
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState(prev => ({
        ...prev,
        isLoading: true,
        BowserProps: { ...prev.BowserProps, mood: "excited", color: "yellow" }
      }));
      setTimeout(async () => {      
        const cred = {
        username: "Lambda School",
        password: "i<3Lambd4"
        }
        const res = await axios.post("/api/login", cred);
        const key = res.data.payload;
        window.localStorage.setItem("key", key);
        this.setState(prev => ({ ...prev, username: "", password: "" }));
        this.setState(prev => ({
          ...prev,
          isLoading: false,
          BowserProps: { ...prev.BowserProps, mood: "happy", color: "green" }
        }));
        await this.props.setStorage(window.localStorage.getItem("key"));
        this.props.history.push('/friendlist')
      }, 2000);
    } catch (er) {
      this.setState(prev => ({
        ...prev,
        isLoading: "error",
        BowserProps: { ...prev.BowserProps, mood: "ko", color: "red" }
      }));
      console.log(er);
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(prev => ({ ...prev, [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={this.state.username}
          placeholder="Enter Username"
          onChange={this.handleChange}
          type="text"
          name="username"
          required
        />
        <Input
          value={this.state.password}
          placeholder="Enter Password"
          onChange={this.handleChange}
          type="password"
          name="password"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
        <Bowser {...this.state.BowserProps} />
      </form>
    );
  }
}
