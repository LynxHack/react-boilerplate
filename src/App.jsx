import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import {generateRandomId} from './generaterandomid.jsx'


class App extends Component {
  constructor(){
    super();
    this.state={
      currentUser : 'Bob',
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          id: generateRandomId()()
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          id: generateRandomId()()
        }
      ]
    }
  }

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

  addmessage2list(newMessage){
    console.log(newMessage);
    newMessage['id'] = generateRandomId()(); 
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

    render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addmessage2list={this.addmessage2list.bind(this)}/>
    </div>
    );
  }
}
export default App;
