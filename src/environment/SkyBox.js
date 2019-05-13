const leftTexture = require('#/assets/textures/skybox/panoleft.jpeg');
const rightTexture = require('#/assets/textures/skybox/panoright.jpeg');
const topTexture = require('#/assets/textures/skybox/panotop.jpeg');
const bottomTexture = require('#/assets/textures/skybox/panobottom.jpeg');
const backTexture = require('#/assets/textures/skybox/panoback.jpeg');
const frontTexture = require('#/assets/textures/skybox/panofront.jpeg');

const THREE = window.THREE;
const Component = require("#/system/Component");

class SkyBox extends Component{
    constructor(){
        super();
        this.envMap = new THREE.CubeTextureLoader().load([
            rightTexture,
            leftTexture,
            topTexture,
            bottomTexture,
            frontTexture,
            backTexture
        ]);
        this.envMap.format = THREE.RGBFormat;
    }

    onCreate(){
        this.$app.scene.background = this.envMap;
    }
}


module.exports = SkyBox;