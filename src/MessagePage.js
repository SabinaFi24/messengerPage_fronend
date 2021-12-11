import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

//page for showing messages:
class MessagePage extends React.Component {
    state = {
        token: "",
        username:"",
        title:"",
        content: "",
        messages: [],
        reading_date : false,
        response: ""
    }

    componentDidMount() {
        this.getAllMessages()
    }

    getAllMessages = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-messages", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    messages: response.data
                })
            })
    }

    removeMessage = (messageId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/remove-message", {
            params: {
                token: cookies.get("logged_in"),
                messageId :messageId

            }
        })
            .then((response) => {
                const currentMessage = this.state.messages;
                this.setState({
                    posts: currentMessage.filter((item) => {
                        return item.id != messageId
                    })
                })
            })
    }
    markAsRead = (messageId) => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/mark-read", {
            params: {
                token: cookies.get("logged_in"),
                messageId :messageId,
                reading_date :this.state.reading_date
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({
                        reading_date : true,
                        response : "READ"
                    })
                } else {
                    this.setState({response:"The message has already been read"})
                }
            })
    }

    render() {

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "light_gray" ,
            color: "blue",
            borderRadius: "5px"
        }
        return (
            <div>
                <div>
                    hello
                </div>
                {
                    this.state.messages.map(message => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                                <i style={{fontSize: "12px"}}>
                                    {message.title}
                                </i>
                                <i style={{fontSize: "12px"}}>
                                    {message.content}
                                </i>
                                <i style={{fontSize: "12px"}}>
                                    {message.username}
                                </i>
                                <p style={{fontSize: "8px"}}>
                                    {message.date}
                                </p>
                                <button style={{fontSize: "5px"}} onClick={() => this.removeMessage(message.id)}>
                                    X
                                </button>
                                <button style={{fontSize: "5px"}} onClick={() => this.markAsRead(message.id)}>read</button>


                            </div>
                        )
                    })
                }


            </div>
        )
    }
}

export default MessagePage;