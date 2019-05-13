const Application = require('#/system/Application');

//controls
const FirstPersonController = require('#/controls/FirstPersonController');

//environment
const SkyBox = require('#/environment/SkyBox');
const TestBox = require('#/environment/TestBox');


class App extends Application{
    constructor(root){
        super(root);
        this.skybox = new SkyBox();
        this.controller = new FirstPersonController();
        this.testBox = new TestBox();
    }

    onCreate(){
        this.use(this.skybox);
        this.use(this.controller);
        this.use(this.testBox);
        this.setCamera(this.controller.getCamera());
    }
}

module.exports = App;