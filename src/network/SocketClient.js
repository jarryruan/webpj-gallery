const io = require('socket.io-client');
const config = require('#/config');


class SocketClient{

    constructor(){
        this._io = io(config.server.root);
        this.on = this._io.on.bind(this._io);
        this.emit = this._io.emit.bind(this._io);
    }
}


module.exports = SocketClient;