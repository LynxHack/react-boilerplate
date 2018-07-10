import React, {Component} from 'react';
require('../styles/application.scss');

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return(<div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>);
  }
}

export default Message;