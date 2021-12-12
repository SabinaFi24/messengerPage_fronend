import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

//page for sending messages:
class SendMessagePage extends React.Component {

    state = {
        token: "",
        username:"",
        title:"",
        content: "",
        messages: [],
        receiverId : ""
    }

    onTitleChange = (e) => {
        let title = e.target.value;
        this.setState({
            title: title
        })
    }
    onContentChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content
        })
    }
    onReceiverChange = (e) => {
        let receiverId = e.target.value;
        this.setState({
            receiverId: receiverId
        })
    }

    addMessage = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/add-message", {
            params: {
                token: cookies.get("token"),
                receiverUsername :this.state.receiverId,
                title : this.state.title,
                content: this.state.content
            }
        })
            .then((response) => {
                if (response.data) {
                    const currentMessages = this.state.messages;
                    currentMessages.unshift({
                        receiverUsername :this.state.receiverId,
                        title : this.state.title,
                        content: this.state.content,
                        date: "Few moments ago...",
                        senderId : this.state.token
                    })
                    alert("message send")
                    this.setState({
                        messages: currentMessages,
                        receiverId:"",
                        title:"",
                        content: ""
                    })
                } else {
                    alert("couldn't send message")
                }
            })
    }

    render() {
        const disable = !(this.state.title.length<1 || this.state.content.length<1)
        return (
            <div>

                <div style={{marginTop: "30px"}}>

                    <textarea
                        onChange={this.onTitleChange}
                        value={this.state.title}
                        placeholder={"Enter title"}
                    /><br/>
                    <textarea
                        onChange={this.onContentChange}
                        value={this.state.content}
                        placeholder={"Enter message content"}
                    /><br/>
                    <textarea
                        onChange={this.onReceiverChange}
                        value={this.state.receiverId}
                        placeholder={"Enter addressee"}
                    /><br/>

                    <button onClick={this.addMessage} disabled={!disable}>Send</button>
                </div>
            </div>
        )
    }
}

export default SendMessagePage;