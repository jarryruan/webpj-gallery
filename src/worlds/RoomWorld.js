const THREE = window.THREE;
const World = require('#/system/World');
const config = require('#/config');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');
const NPC = require('#/controls/NPC');
const DataSender = require('#/controls/DataSender');
const CommentSender = require('#/controls/CommentSender');
const BarrageSender = require('#/controls/BarrageSender');
const UserInfoSender = require('#/controls/UserInfoSender');

//environment
const SkyBox = require('#/environment/room/SkyBox');
const Floor = require('#/environment/room/Floor');
const Comment = require('#/environment/room/Comment');
const Canvas = require('#/environment/room/Canvas');
const MovementRestrict = require('#/environment/room/MovementRestrict');
const PlayerGroup = require("#/controls/PlayerGroup");
const Light = require('#/environment/room/Light');

class RoomWorld extends World{
    constructor(){
        super('room');
        this.options = {};
        this.skyBox = new SkyBox();
        this.comments = [];
        this.floor = new Floor();
        this.canvas = null;
        this.playerGroup = new PlayerGroup(-2);
        this.controller = new FirstPersonController();
        this.dataSender = new DataSender(-2);

        this.NPC = new NPC(1);
    }

    onCreate() {
        super.onCreate();

        this.use(new Light());
        this.use(this.skyBox);
        this.use(this.floor);
        this.use(this.controller);
        this.use(this.playerGroup);

        this.controller.use(this.dataSender);
        this.controller.use(new MovementRestrict());
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
                value.highlight();
            } else {
                value.unhighlight();
            }
        });

    }

    update(options){
        this.options = options;
        this.unmount(this.canvas);
        this.unmount(this.NPC);
        this.unmountAll(this.comments);
        this.setCanvas(this.options.paintingPath);
        this.getComments();
        this.NPC.setPaintingId(this.options.paintingId);
        this.use(this.NPC);
        this.NPC.getObject().position.set(40, 0, -80);
        this.NPC.getObject().rotation.set(0, Math.PI * 4 / 5, 0);
        this.dataSender.paintingId = this.options.paintingId;
        this.playerGroup.paintingId = this.options.paintingId;
    }

    setCanvas(url) {
        this.canvas = new Canvas(url);
        this.canvas.getObject().position.set(0, 45, -100);
        this.use(this.canvas);
    }

    getComments() {
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
        config.axiosInstance.get(`/api/paintings/${this.options.paintingId}/comments`)
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
    }

    addComment(options) {
        let comment = new Comment(options);
        this.comments.push(comment);
        this.use(comment);
    }

}

module.exports = RoomWorld;