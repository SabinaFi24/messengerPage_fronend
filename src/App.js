import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import MessagePage from "./MessagePage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import SendMessagePage from "./SendMessagePage";

class App extends React.Component {

    state = {
        isLoggedIn: false,
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("token") && (cookies.get("token").length>0)) {
            this.setState({
                isLoggedIn: true,
            })
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                <Route path={"/"} component={ProfilePage} exact={true}/>
                                <Route path={"/profile"} component={ProfilePage} exact={true}/>
                                <Route path={"/messages"} component={MessagePage} exact={true}/>
                                <Route path={"/send"} component={SendMessagePage} exact={true}/>

                            </div>
                            :
                            <div>
                                <Route path={"/"} component={LoginPage}/>
                            </div>
                    }
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
