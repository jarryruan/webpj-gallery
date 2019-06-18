const Component = require('#/system/Component');
const config = require('#/config');

const KeyCodes = {
    E: 69,
    
};

class CommentSender extends Component{
    onCreate(){
        super.onCreate();

        this.$world.addEventListener('keyup', this._onKeyUp.bind(this));
    }

    _onKeyUp(event) {
        const code = event.keyCode;

        if (code === KeyCodes.E) {
            config.axiosInstance.get("/api/users/self")
                .then((resp) => {
                    if (resp.status === 200) {
                        let response = resp.data;
                        if (response.result) {
                            let userInfo = Object.assign({}, {username: response.user.username}, {
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
                                paintingId: this.$world.options.paintingId
                            });
                            this.$ui.show(userInfo, "write");
                            this.$parent.active = false;
                            document.exitPointerLock();
                        } else {
                            alert(response.message);
                        }
                    }
                });
        }
    }
    
}

module.exports = CommentSender;