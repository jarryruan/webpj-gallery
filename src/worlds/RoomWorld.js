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
const Sprite = require('#/environment/room/Sprite');

class RoomWorld extends World{
    constructor(id){
        super();
        this.id = id;
        this.skyBox = new SkyBox();
        this.comments = [];
        this.floor = new Floor();
        this.canvas = null;
        // this.sprite = new Sprite();
        this.controller = new FirstPersonController({
            horizontalSensitivity: 0.002,
            verticalSensitivity: 0.002,
            moveSpeed: 50.0,
            frictionFactor: 10.0,
            height: 10
        });
        this.controller.setRoomId(id);

    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.floor);
        this.canvas = this.setCanvas(initCanvas);

        this.use(this.canvas);
        // this.use(this.sprite);

        const comment1 = new Comment("测试评论", 0, 10);
        this.comments.push(comment1);

        this.useAll(this.comments);
        this.use(this.controller);
        this.setCamera(this.controller.getCamera());

        this.$dom.addEventListener('click', this.commentClick.bind(this));
    }

    commentClick() {
        this.comments.forEach((value) => {
            if (value.selected) {
                this.$ui.show(value.getText(), 'read');
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