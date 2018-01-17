let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

let clients = [];

const port = process.env.PORT || 8000;

io.on('connection', (client) => {
    console.log('client connected');
    clients.push(client);

    client.on('add-message', (message) => {
        io.emit('message', {type:'new-message', text: message});    
    });

    client.on('start-timer', () => {
        let interval = 3000;
        console.log("user subscribing to timer", interval);
        setInterval( () => {
            io.emit('new-time', {text: new Date() } );
        }, interval);
    });

    client.on('disconnect', () => { 
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});