const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/hall/SkyBox');
const TestBox = require('#/environment/hall/TestBox');
const Floor=require('#/environment/hall/Floor');
const RoomCenter=require('#/environment/hall/RoomCenter');


class HallWorld extends World{
    constructor(){
        super();
        this.skyBox = new SkyBox();
        this.controller = new FirstPersonController();
        // this.testBox = new TestBox();
        this.floor=new Floor();
        this.roomCenter=new RoomCenter();
    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.controller);
        // this.use(this.testBox);
        this.use(this.floor);
        this.use(this.roomCenter);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = HallWorld;