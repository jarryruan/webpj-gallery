const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/hall/SkyBox');
const TestBox = require('#/environment/hall/TestBox');
const Floor=require('#/environment/hall/Floor');
const RoomOne=require('#/environment/hall/RoomOne');
const RoomTwo=require('#/environment/hall/RoomTwo');
const RoomThree=require('#/environment/hall/RoomThree');
const Guide=require('#/environment/hall/Guide');

class HallWorld extends World{
    constructor(){
        super();
        this.skyBox = new SkyBox();
        this.controller = new FirstPersonController();
        // this.testBox = new TestBox();
        // this.floor=new Floor();
        this.roomCenter1=new RoomOne();

        this.roomCenter2=new RoomTwo();
        this.roomCenter3=new RoomThree();
        this.floor=new Floor();
        this.guide=new Guide();
    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.controller);
        // this.use(this.testBox);
        // this.use(this.floor);

        this.use(this.guide);
        this.use(this.roomCenter1);
        this.use(this.roomCenter2);
        this.use(this.roomCenter3);
        this.use(this.floor);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = HallWorld;