import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import {generateRandomId} from './generaterandomid.jsx'


class App extends Component {
  constructor(){
    super();
    this.socket = new WebSocket('ws://localhost:3001', 'protocolOne');
    this.state={
      currentUser : 'Bob',
      messages: [],
      namechangemessages: [],
      numberofusers: 0
    }
  }
  
  componentDidMount(){
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
          let test = this.state.namechangemessages;
          test.push(`${newmessage.originaluser} changed their name to ${newmessage.newuser}`);
          this.setState({namechangemessages: test});
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
    console.log(numusers);
    return (
      <div style={{position: 'relative', float: 'right', top: '20px'}}>{numusers} users online</div>
    )
  }

  handlenotifications(notification){
    console.log("came in here");
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
      <MessageList messages={this.state.messages}/>
      <div className="notification">
      {this.handlenotifications(this.state.namechangemessages)}
      </div>
      <ChatBar currentUser={this.state.currentUser} changecurrentuser={this.changecurrentuser.bind(this)} addmessage2list={this.addmessage2list.bind(this)}/>
    </div>
    );
  }
}
export default App;


  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }
