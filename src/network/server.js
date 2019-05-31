const SocketServer = require('./SocketServer');

const server = new SocketServer(3000);
server.start();