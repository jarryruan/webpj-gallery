const SocketServer = require('./SocketServer');

const server = new SocketServer(3004);
server.start();