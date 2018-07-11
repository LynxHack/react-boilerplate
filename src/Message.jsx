import React, {Component} from 'react';
require('../styles/application.scss');

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  createpost(content){
    const last3char = content.substr(content.length - 3)
    if( last3char === 'jpg' || last3char === 'png' || last3char === 'gif'){
      return (<span className="message-content"><img src={content} style={{maxWidth : '60%'}}/></span>)
    }
    return (<span className="message-content">{content}</span>) 
  }

  render(){
    return(<div className="message">
          <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
          {/* <span className="message-content">{this.props.content}</span> */}
          {this.createpost(this.props.content)}
        </div>);
  }
}

export default Message;