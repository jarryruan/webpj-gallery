const World = require('#/system/World');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/SkyBox');
const TestBox = require('#/environment/TestBox');


class HallWorld extends World{
    constructor(){
        super();
        this.skyBox = new SkyBox();
        this.controller = new FirstPersonController();
        this.testBox = new TestBox();

    }

    onCreate() {
        super.onCreate();
        this.use(this.skyBox);
        this.use(this.controller);
        this.use(this.testBox);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = HallWorld;