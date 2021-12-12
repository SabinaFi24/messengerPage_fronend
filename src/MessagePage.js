import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

//page for showing messages:
class MessagePage extends React.Component {
    state = {
        token: "",
        /*username:"",
        title:"",
        content: "",*/
        messages: [],
       // reading_date : false,
        response: ""
    }

    componentDidMount() {
        this.getAllMessages()
    }

    getAllMessages = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-messages", {
            params: {
                token: cookies.get("token")
            }
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    this.setState({
                        messages: response.data
                    })
                }else{
                    this.setState({
                        response: "no new messages"
                    })
                }
            })
    }

    removeMessage = (messageId) => {
        //const cookies = new Cookies();
        //console.log("removeMessage")
        axios.get("http://localhost:8989/remove-message", {
            params:{
                messageId : messageId
            }
        }).then((response) =>{
            if (response) {
                alert("message hes been removed")
                window.location.reload();
            } else {
                alert( "ERROR")
            }
        })
    }
    markAsRead = (messageId) => {
       // const cookies = new Cookies();
        axios.get("http://localhost:8989/read-message", {
            params: {
                messageId : messageId
            }

        }).then((response) => {
            if (response.data) {
                window.location.reload();
            }
            else {
                alert( "ERROR")
            }

        })
    }

    render() {

        return (
            <div>
                {this.state.response}
                {
                            this.state.messages.length >0 &&
                            this.state.messages.map(message => {
                        return (
                            <div style={{borderBottom: "1px solid black", padding: "10px", width: "300px"}}>
                                <i style={{fontSize: "20px"}}>
                                    {message.title}
                                </i>
                                <br/>
                                <i style={{fontSize: "12px"}}>
                                    {message.content}
                                </i>
                                <br/>
                                <i style={{fontSize: "12px"}}>
                                    {message.senderId}
                                </i>
                                <p style={{fontSize: "8px"}}>
                                    {message.sendDate}
                                </p>
                                <button style={{fontSize: "10px"}} onClick={() => this.removeMessage(message.message_id)}>Delete</button>
                                <button style={{fontSize: "10px"}} onClick={() => this.markAsRead(message.messageId)} disabled={message.isRead===1}>read</button>


                            </div>
                        )
                    })
                }


            </div>
        )
    }
}

export default MessagePage;