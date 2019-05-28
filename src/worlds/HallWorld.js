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
        // this.floor=new Floor();
        this.roomCenter1=new RoomCenter();

        this.roomCenter2=new RoomCenter();
        this.roomCenter3=new RoomCenter();
        this.floor=new Floor();

    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.controller);
        // this.use(this.testBox);
        // this.use(this.floor);
        let a=this.roomCenter1.getObject();
        a.translateZ(-50);
        a.translateX(87);
        a.rotation.y=Math.PI/6;
        this.roomCenter1.setObject(a);

        let b=this.roomCenter2.getObject();
        b.translateZ(-50);
        b.translateX(-87);
        b.rotation.y=-Math.PI/6;
        this.roomCenter2.setObject(b);

        let c=this.roomCenter3.getObject();
        c.translateZ(100);
        this.roomCenter3.setObject(c);
        this.use(this.roomCenter1);
        this.use(this.roomCenter2);
        this.use(this.roomCenter3);
        this.use(this.floor);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = HallWorld;