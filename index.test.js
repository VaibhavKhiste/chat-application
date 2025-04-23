const { io } = require('socket.io-client');

const socketUrl = 'http://localhost:3000';
const options = {
    transports: ['websocket'],
    'force new connection': true
};

const client1 = io(socketUrl, options);
const client2 = io(socketUrl, options);

client1.on('connect', () => {
    console.log('Client 1 connected');
    client1.emit('join room', 'room1');
});

client2.on('connect', () => {
    console.log('Client 2 connected');
    client2.emit('join room', 'room1');
    client2.emit('message', 'Hello from Client 2');
});

client1.on('message', (msg) => {
    console.log(`Client 1 received: ${msg}`);
});

// Clean up
setTimeout(() => {
    client1.disconnect();
    client2.disconnect();
}, 5000);
