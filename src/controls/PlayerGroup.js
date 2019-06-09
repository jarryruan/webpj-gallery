const Component = require('#/system/Component');
const THREE = window.THREE;

const Player = require('./Player');

class PlayerGroup extends Component{
    constructor(paintingId = -1){
        super();
        this.players = new Map();
        this.paintingId = paintingId;
    }

    onCreate(){
        this.setObject(new THREE.Group());
        this.$client.on('move', this.withVerifing(this.onMove.bind(this)));
        this.$client.on('barrage', this.withVerifing(this.onBarrage.bind(this)));
        this.$client.on('exit', this.onExit.bind(this));
        
    }

    getPlayer(socketId){
        if(!this.players.has(socketId)){
            const player = new Player();
            this.players.set(socketId, player);
            this.use(player);
        }
        return this.players.get(socketId);
    }

    withVerifing(callback){
        return (data) => {
            if(data.paintingId === this.paintingId)
                callback(data);
        }
    }

    onMove(data){
        const player = this.getPlayer(data.socketId);
        player.moveTo(data.position, data.rotation);
    }

    onExit(data){
        const { socketId } = data;

        if(this.players.has(socketId)){
            const player = this.players.get(socketId);
            this.unmount(player);
            this.players.delete(player);
        }
    }

    onBarrage(data){
        const player = this.getPlayer(data.socketId);
        player.showBarrage(data.content);
    }
}


module.exports = PlayerGroup;