//components
import React, { Component } from "react";
import SignUp from "../components/SignUp";

//stylesheet
import "./register-styles.scss";

export class Register extends Component {
  render() {
    return (
      <div>
        <SignUp />
      </div>
    );
  }
}

export default Register;
