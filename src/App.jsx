import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(){
    super();
    this.colors = ['#3fc6ae', '#bc0f0f', '#2243c9', '#1fc443']
    this.socket = new WebSocket('ws://localhost:3001', 'protocolOne');
    this.state={
      currentUser : 'Anonymous',
      messages: [],
      numberofusers: 0,
      color: '#000000'
    }
  }
  
  componentDidMount(){
    this.setState({color: this.colors[Math.floor(Math.random()*4)]});
    this.socket.onopen = (event) => {
      console.log('Connected to socket!');
    }
    this.socket.onmessage = (event) => {
      let newmessage = JSON.parse(event.data);
      switch(newmessage.type){
        case 'incomingMessage':
          const messages = this.state.messages.concat(newmessage)
          this.setState({messages: messages})
        break;

        case 'incomingNotification':
          const test = this.state.messages.concat(newmessage)
          this.setState({messages: test})
        break;

        case 'numusers':
          console.log('Number of users now: ' + newmessage.numusers);
          this.setState({numberofusers: newmessage.numusers});
        break;

        default:
          throw new Error('No corresponding message type found on client end');
      }

    }
  }

  addmessage2list(newMessage){
    let message = newMessage;
    message['type'] = 'postMessage';
    this.socket.send(JSON.stringify(message));
  }

  changecurrentuser(e){
    if(e.key == 'Enter'){
      let originaluser = this.state.currentUser;
      this.setState({currentUser : e.target.value}, () =>{
        let userobject = {type: 'postNotification', originaluser: originaluser, newuser: this.state.currentUser};
        this.socket.send(JSON.stringify(userobject));
      });
    }
  }
  
  notifynumusers(numusers){
    return (
      <div style={{position: 'relative', float: 'right', top: '20px'}}>{numusers} users online</div>
    )
  }

  handlenotifications(notification){
    return (
      <span className="notification-content">{notification}</span>
    );
  }

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        {this.notifynumusers(this.state.numberofusers)}
      </nav>
      <MessageList messages={this.state.messages} color={this.state.color}/>
      <div className="notification">
      {this.handlenotifications(this.state.namechangemessages)}
      </div>
      <ChatBar currentUser={this.state.currentUser} changecurrentuser={this.changecurrentuser.bind(this)} addmessage2list={this.addmessage2list.bind(this)}/>
    </div>
    );
  }
}
export default App;
