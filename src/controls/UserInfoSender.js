const Component = require('#/system/Component');

const KeyCodes = {
    P: 80,

};

class UserInfoSender extends Component{
    onCreate(){
        super.onCreate();

        this.$world.addEventListener('keyup', this._onKeyUp.bind(this));
    }

    _onKeyUp(event) {
        const code = event.keyCode;

        if (code === KeyCodes.P) {
            let userInfo = Object.assign({}, {username: 'username'}, {
                position: {
                    x: this.$parent.getObject().position.x,
                    y: this.$parent.getObject().position.y,
                    z: this.$parent.getObject().position.z
                },
                rotation: {
                    x: 0,
                    y: this.$parent.yawObject.rotation.y,
                    z: 0
                },
                roomId: this.$world.id
            });
            this.$ui.show(userInfo, "user");
            this.$parent.active = false;
            document.exitPointerLock();
        }
    }

}

module.exports = UserInfoSender;