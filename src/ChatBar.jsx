import React, {Component} from 'react';
require('../styles/application.scss');
class ChatBar extends Component {
    constructor(props){
      super(props);
      this.state = {
        username: this.props.currentUser,
        content: '',
        currentUser: this.props.currentUser
      }
    }
    
    usernametype(e){
      this.setState({username: e.target.value});
    }

    contenttype(e){
      this.setState({content: e.target.value});
    }

    entered(e){
      if(e.key == 'Enter'){
        let newmessage = {'username': this.state.username, 'content': e.target.value};
        this.props.addmessage2list(newmessage);
      }
    }
    
    render(){
      return( 
      <footer className="chatbar">
        <input name='username' defaultValue = {this.props.currentUser} onChange={this.usernametype.bind(this)} onKeyPress={this.props.changecurrentuser} className="chatbar-username" placeholder="Your Name (Optional)" />
        <input name='content' onChange={this.contenttype.bind(this)} onKeyPress={this.entered.bind(this)} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
      );
    }
  }

export default ChatBar;