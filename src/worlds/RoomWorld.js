const initCanvas = require('#/assets/textures/canvas/canvas-1.jpg');

const THREE = window.THREE;
const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/room/SkyBox');
const Floor = require('#/environment/room/Floor');
const Comment = require('#/environment/room/Comment');
const Canvas = require('#/environment/room/Canvas');
const PlayerGroup = require("#/controls/PlayerGroup");

const config = require('#/config');
const Light = require("#/environment/hall/Light");
const DataSender = require('#/controls/DataSender');
const CommentSender = require('#/controls/CommentSender');
const BarrageSender = require('#/controls/BarrageSender');
const UserInfoSender = require('#/controls/UserInfoSender');

class RoomWorld extends World{
    constructor(id){
        super('room');
        this.id = id;
        this.skyBox = new SkyBox();
        this.comments = [];
        this.floor = new Floor();
        this.canvas = null;
        this.playerGroup = new PlayerGroup();
        this.controller = new FirstPersonController();
    }

    onCreate() {
        super.onCreate();
        this.canvas = this.setCanvas(initCanvas);
        const comment1 = new Comment({
            "userId": 1,
            "username": "黑桐谷歌",
            "content": "居然是讯息",
            "transform": {
                "position": {"x": 0, "y": 0, "z": -10},
                "rotation": {"x": 0, "y": 2, "z": 0}
            }
        });

        // get comments from server
        config.axiosInstance.get(`/api/paintings/${this.id}/comments`)
            .then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        this.comments = response.comments.map((value) => (new Comment(value)));
                        this.comments.push(comment1);
                        this.useAll(this.comments);

                    } else window.message.error(response.message);
                } else window.message.error("加载评论失败");
            }).catch((error) => {
                window.message.error(error);
            });

        this.use(new Light());
        this.use(this.skyBox);
        this.use(this.floor);
        this.use(this.canvas);
        this.use(this.controller);
        this.use(this.playerGroup);
        this.controller.use(new DataSender());
        this.controller.use(new CommentSender());
        this.controller.use(new BarrageSender());
        this.controller.use(new UserInfoSender());

        this.setCamera(this.controller.getCamera());
        this.$dom.addEventListener('click', this.commentClick.bind(this));
    }

    commentClick() {
        this.comments.forEach((value) => {
            if (value.selected) {
                let commentInfo = Object.assign({}, {
                    username: value.getUsername(),
                    text: value.getText()
                });
                this.$ui.show(commentInfo, 'read');
            }
        })
    }

    onRender(deltaTime) {
        super.onRender(deltaTime);

        this.comments.forEach((value) => {
            let intersect = this.controller.getRayCaster().intersectObject(value.getObject());
            if (intersect.length > 0) {
                intersect[0].object.material.color.set(0xff0000);
                value.selected = true;
            } else {
                value.getObject().material.color.set(0xee00ee);
                value.selected = false;
            }
        });

    }

    setCanvas(url) {
        return new Canvas(url);
    }

}

module.exports = RoomWorld;