const Component = require('#/system/Component');
const THREE = window.THREE;

const Player = require('./Player');

class PlayerGroup extends Component{
    constructor(){
        super();
        this.players = new Map();
    }

    onCreate(){
        this.setObject(new THREE.Group());

        this.$client.on('move', this.onMove.bind(this));
        this.$client.on('exit', this.onExit.bind(this));
        
    }

    onMove(data){
        const  { socketId } = data;

        if(!this.players.has(socketId)){
            const player = new Player();
            this.players.set(socketId, player);
            this.use(player);
        }

        const player = this.players.get(socketId);
        player.sync(data.position, data.rotation);
    }

    onExit(data){
        const { socketId } = data;
        if(this.players.has(socketId)){
            const player = this.players.get(socketId);
            this.unmount(player);
            this.players.delete(player);
        }
    }
}


module.exports = PlayerGroup;