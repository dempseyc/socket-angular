let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 8000;

let game = {
    // state 1 receiving clients
    // state 2 receiving names, ready for
    // state 3 getting cards
    // state 4 receiving note, ready for
    // state 5 starting timer, giving prompts, going to sleep,
    // this starts the loop, the vampire wakes up, kills,
    // the players decide who to lynch or no-one,
    // maybe when they lynch someone, the vampire kills no one
    // they go to sleep again,
    // 
    gameOn: false,
    numJoined: 0,
    playerNames: [],
    numReady: 0
}

io.on('connection', (client) => {

    game.numJoined += 1;
    console.log(game.numJoined, "numJoined");

    client.on('add-message', (message) => {
        io.emit('message', {type:'new-message', text: message});    
    });

    client.on('add-name', (name) => {
        game.playerNames.push(name);
        io.emit('name', {type: 'new-name', text: name});
    });

    client.on('start-timer', () => {
        let interval = 3000;
        console.log("user subscribing to timer", interval);
        setInterval( () => {
            io.emit('new-time', {text: new Date() } );
        }, interval);
    });

    if (game.numJoined >1) {
        console.log("2 players joined");
    }

    // here handle players ready..  

    client.on('disconnect', () => { 
        client.leave('room-1');
        game.numJoined -= 1;
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});