import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Pattern from "@testing-library/jest-dom/dist/utils";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response: "",
        validPhoneNumber: "",
        validStrongPassword: ""
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })

    }

    onPasswordChange = (e) => {
        let password = e.target.value
        this.setState({
            password: password
        })

    }


    login = () => {
        axios.get("http://localhost:8989/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                switch (response.data){
                    case "wrongUserName":
                        this.setState({showError: true});
                        alert("Username not exist");
                        break;
                    case "wrongPassword":
                        this.setState({showError: true});
                        alert("Wrong password");
                        break;
                    case "userLocked":
                        this.setState(
                            {showError: true,
                                    blocked: true});
                        alert("User blocked , please contact the system manager");
                        break;
                    default:
                        const cookies = new Cookies();
                        cookies.set("token", response.data);
                        window.location.reload();



                }

            })

    }


    signUp = () => {
        axios.get("http://localhost:8989/doesUserExist", {
            params: {
                username: this.state.username
            }
        })
            .then((response) => {
                if(!response.data){
                    this.setState(
                        {validPhoneNumber:"",
                              validStrongPassword:"",
                              response:""})

                    let reg = new RegExp(/[0][5][023458]\d{7}/);
                    const validPhoneNumber = reg.test(this.state.username) && this.state.username.length === 10;
                    if(!validPhoneNumber){
                        this.setState(
                            {validPhoneNumber: "invalid phone number"})}

                    const validStrongPassword = (/[a-zA-Z0-9]/g.test(this.state.password) && /\d/g.test(this.state.password) && 6<= this.state.password.length);
                    if(!validStrongPassword){
                        this.setState({
                            validStrongPassword: "not a strong password, must be at least 6 chars: letters/numbers "})}

                    if(validPhoneNumber && validStrongPassword) {
                        axios.get("http://localhost:8989/create-account", {
                            params: {
                                username: this.state.username,
                                password: this.state.password
                            }
                        })
                            .then((response) => {
                                if (response.data) {
                                    this.setState({
                                        response: "Your account has been created!",
                                        validPhoneNumber:"",
                                        validStrongPassword:"",
                                        showError: true,
                                    })
                                } else {
                                    this.setState({response: "failed to create an account", showError: true})
                                }
                            })
                    }
                }
                else{
                    this.setState({
                        response : "this phone number is in use"
                    })
                }
            })

    }

    render(){


        const inputStyle = {
            margin: "10px",
            width: "200px"
        }

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        const signUpButtonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            marginTop: "20px"
        }
       /* const letterMatch = /^[a-zA-Z]+$/.test(this.state.password);
        const digitMatch = /^[0-9]+$/.test(this.state.password);

        const pass=!((this.state.password === "") && (this.state.password.length<6) && (!letterMatch) && (!digitMatch));
        const name=!((this.state.username === "") && (this.state.username.length !==10) && (this.state.username.charAt(0)!=="0") && (this.state.username.charAt(1)!=="5"));*/


        const hasRequiredDetails= !(this.state.username === "" || this.state.password === "");
        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "300px"}}>
                    <legend>
                        <div style={{fontSize: "20px"}}>
                            Login to your account
                        </div>
                    </legend>

                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails} >Login</button>
                    </div>
                    <div>
                        <button style={signUpButtonStyle} onClick={this.signUp} disabled={!hasRequiredDetails } >Sign Up</button>
                    </div>

                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
                <div style={{color: "red"}}>{this.state.validStrongPassword}</div>
                <div style={{color: "red"}}>{this.state.validPhoneNumber}</div>
            </div>
        )
    }
}

export default LoginPage;
