const Component = require('#/system/Component');


class DataSender extends Component{
    onCreate(){
        super.onCreate();
        
        this.ping = 60;
        setInterval(this.onSyncMovement.bind(this), this.ping);

        this.$framework.export('sendBarrage', this.sendBarrage.bind(this));
    }

    onSyncMovement(){
        this.$client.emit('move', {
            world: this.$world.name,
            position: {
                x: this.$parent.getObject().position.x,
                y: this.$parent.getObject().position.y,
                z: this.$parent.getObject().position.z
            },
            rotation: {
                x: 0,
                y: this.$parent.yawObject.rotation.y,
                z: 0
            }
        });
    }

    sendBarrage(message){
        this.$client.emit('barrage', { content: message });
    }
}

module.exports = DataSender;