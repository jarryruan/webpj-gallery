const Component = require('#/system/Component');


class DataSender extends Component{
    constructor(paintingId = -1){
        super();
        this.paintingId = paintingId;
    }

    onCreate(){
        super.onCreate();
        this.active = true;
        this.ping = 100;
        this.$framework.export('sendBarrage', this.sendBarrage.bind(this));
        setInterval(this.onSyncMovement.bind(this), this.ping);
    }

    onAwake(){
        super.onAwake();
        this.active = true;
    }

    onSuspend(){
        super.onSuspend();
        this.active = false;
    }

    onSyncMovement(){
        if(this.active){
            this.$client.emit('move', {
                paintingId: this.paintingId,
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
    }

    sendBarrage(message){
        this.$client.emit('barrage', {
            paintingId: this.paintingId,
            content: message 
        });
    }
}

module.exports = DataSender;