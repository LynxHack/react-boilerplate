import React, {Component} from 'react';
import Message from './Message.jsx'
require('../styles/application.scss');
class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    generateMessages(messagelist){
        console.log(messagelist);
        const fullmessages = messagelist.map(message => 
            (<Message key={message.id} username={message.username} content={message.content}/>)
        );
        return fullmessages;
    }

    render(){
        return(    
        <main className="messages">
        {this.generateMessages(this.props.messages)}
        {/* <div className="message system">
            Anonymous1 changed their name to nomnom.
        </div> */}
        </main>);
    }
}

 export default MessageList;