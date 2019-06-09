const express = require('express');
const io = require('socket.io');
const http = require('http');



class SocketServer{
    constructor(port){
        this.port = port;
        this._app = express();
        this._app.get((res, req) => { res.end('Hello World'); });
        this._http = http.createServer(this._app);
    }

    start(){
        this._http.listen(this.port, () => {
            console.log(`当前服务器正在端口 ${this.port} 上监听...`);
        });

        this._io = io(this._http);
        this._io.on('connection', this.onConnection.bind(this));
    }

    onConnection(client){
        console.log(`客户端 ${client.id} 已连接`);
        client.on('disconnect', () => {this.onDisconnect(client)});
        client.on('move', (data) => {this.broadcast('move', client, data)});
        client.on('barrage', (data) => {this.broadcast('barrage', client, data)});
    }

    broadcast(eventName, client, data){
        client.broadcast.emit(eventName, Object.assign({ socketId: client.id }, data));
    }

    onDisconnect(client){
        console.log(`客户端 ${client.id} 已退出`);
        client.broadcast.emit('exit', { socketId: client.id });
    }
}

module.exports = SocketServer;