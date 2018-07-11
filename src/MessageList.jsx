import React, {Component} from 'react';
import Message from './Message.jsx'
require('../styles/application.scss');
class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    generateMessages(messagelist, color){
        const fullmessages = messagelist.map(message => {
            if(message.type==='incomingNotification'){
                return (
                <div key={message.id} className="message system">
                    {message.originaluser} changed their name to {message.newuser}
                </div>
                )
            }
            return (<Message key={message.id} username={message.username} content={message.content} color={color}/>)
        });
        return fullmessages;
    }

    render(){
        console.log(this.props.color);
        return(    
        <main className="messages">
        {this.generateMessages(this.props.messages, this.props.color)}

        </main>);
    }
}

 export default MessageList;