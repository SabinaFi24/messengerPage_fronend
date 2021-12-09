import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

class SignIn extends React.Component {
    state = {
        username: "",
        password: ""
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div>
                Please enter your details to sing in
                <input
                    onChange={this.onUsernameChange}
                    value={this.state.username}
                    placeholder={"Enter username"}
                />
                <input
                    onChange={this.onPasswordChange}
                    value={this.state.password}
                    placeholder={"Enter password"}
                />
                <button onClick={this.login}>Sing up</button>
                <div>{this.state.response}</div>
            </div>
        )
    }
}
export default SignIn;