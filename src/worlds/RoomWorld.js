const THREE = window.THREE;
const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/room/SkyBox');


class RoomWorld extends World{
    constructor(){
        super();
        this.skyBox = new SkyBox();
        this.controller = new FirstPersonController();
    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.controller);
        this.setCamera(this.controller.getCamera());
    }

}

module.exports = RoomWorld;