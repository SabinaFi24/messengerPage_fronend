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
        blocked: 0
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
                if (response.data && response.data.length > 1) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data);
                    window.location.reload();
                } else {
                    if (response.data == 1){
                        this.setState({
                            showError: true ,
                            response : "wrong username"
                        })
                    }
                    else if (response.data == 2){
                        const count =(this.state.blocked)+1 ;
                        if (count<5){
                            this.setState({
                                showError: true ,
                                response : "wrong password",
                                blocked : count
                            })
                        }else {
                            this.setState({
                                showError: true,
                                response: "User blocked , please contact the system manager"

                            })
                        }

                    }

                }
            })

    }


    signUp = (e) => {
        axios.get("http://localhost:8989/create-account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        response: "Your account has been created!"
                    })
                } else {
                    this.setState({showError: true, response: "This username is already taken"})
                }
            })
    }

    render() {


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
        const letterMatch = /^[a-zA-Z]+$/.test(this.state.password);
        const digitMatch = /^[0-9]+$/.test(this.state.password);

        const pass=!((this.state.password == "") && (this.state.password.length<6) && (!letterMatch) && (!digitMatch));
        const name=!((this.state.username == "") && (this.state.username.length !=10) && (this.state.username.charAt(0)!=0) && (this.state.username.charAt(1)!=5));
        const block= (this.state.blocked<5);

        const hasRequiredDetails= (pass||block)&&block;
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
                           pattern="05?[0-9]-?[0-9]{7}"
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9]).{6,}"

                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails} >Login</button>
                    </div>
                    <div>
                        <button style={signUpButtonStyle} onClick={this.signUp} disabled={!hasRequiredDetails} >Sign Up</button>
                    </div>

                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
            </div>
        )
    }
}

export default LoginPage;
