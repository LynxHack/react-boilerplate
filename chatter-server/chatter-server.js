const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    //if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    });
  //});
};

var numusers = 0;

wss.on('connection', (ws) => {
  numusers++;
  console.log('Client connected: Now there are ' + numusers + ' users');
  wss.broadcast(JSON.stringify({type: 'numusers', numusers: numusers}));
  ws.on('message', function incoming(data) {
    let newmessage = JSON.parse(data);
    switch(newmessage.type){
      case 'postMessage':
        console.log("new message: ", newmessage);
        newmessage['id'] = uuidv4();
        newmessage['type'] = 'incomingMessage';
        wss.broadcast(JSON.stringify(newmessage));
      break;

      case 'postNotification':
        console.log(newmessage.originaluser + " changed their name to" + newmessage.newuser);
        let newnotification = newmessage;
        newnotification['id'] = uuidv4();
        newnotification['type'] = 'incomingNotification';
        wss.broadcast(JSON.stringify(newnotification));
      break;

      default:
        throw new Error('Unknown message type ' + data);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numusers--; 
    console.log('Client disconnected. Now there are ' + numusers + ' users'); 
    wss.broadcast(JSON.stringify({type: 'numusers', numusers: numusers}));
  });
});
