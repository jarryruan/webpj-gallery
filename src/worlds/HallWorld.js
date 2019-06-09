const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/hall/SkyBox');
const Fog = require('#/environment/hall/Fog');
const Building = require('#/environment/hall/Building');
const TestBox = require('#/environment/hall/TestBox');
const Floor=require('#/environment/hall/Floor');
const RoomOne=require('#/environment/hall/RoomOne');
const RoomTwo=require('#/environment/hall/RoomTwo');
const RoomThree=require('#/environment/hall/RoomThree');
const Light = require("#/environment/hall/Light");
const Guide=require('#/environment/hall/Guide');
const MovementRestrict=require('#/environment/hall/MovementRestrict');
const PlayerGroup = require("#/controls/PlayerGroup");

const DataSender = require("#/controls/DataSender.js");
const BarrageSender = require('#/controls/BarrageSender');
const UserInfoSender = require('#/controls/UserInfoSender');

const Player = require('#/controls/Player.js');

class HallWorld extends World{
    constructor(){
        super('hall');
        this.skyBox = new SkyBox();
        this.fog = new Fog();
        this.light = new Light();
        this.building = new Building();
        this.controller = new FirstPersonController();
        // this.testBox = new TestBox();
        // this.floor=new Floor();
        this.roomCenter1=new RoomOne();
        
        let a=this.roomCenter1.getObject();
        this.roomCenter2=new RoomTwo();
        let b=this.roomCenter2.getObject();
        this.roomCenter3=new RoomThree();
        this.floor=new Floor();
        this.guide=new Guide();
        this.playerGroup = new PlayerGroup(-1);
    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.fog);
        
        this.use(this.controller);
        this.controller.use(new MovementRestrict());
        // this.use(this.building);
        this.controller.use(new DataSender(-1));
        this.controller.use(new BarrageSender());
        this.controller.use(new UserInfoSender());
        // this.use(this.testBox);
        // this.use(this.floor);

        this.use(this.guide);
        this.use(this.roomCenter1);
        this.use(this.roomCenter2);
        this.use(this.roomCenter3);
        this.use(this.floor);
        this.use(this.playerGroup);
        this.use(this.samplePlayer);
        this.use(this.light);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = HallWorld;