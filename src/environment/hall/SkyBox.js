const leftTexture = require('#/assets/textures/skybox/hall/panoleft.jpg');
const rightTexture = require('#/assets/textures/skybox/hall/panoright.jpg');
const topTexture = require('#/assets/textures/skybox/hall/panotop.jpg');
const bottomTexture = require('#/assets/textures/skybox/hall/panobottom.jpg');
const backTexture = require('#/assets/textures/skybox/hall/panoback.jpg');
const frontTexture = require('#/assets/textures/skybox/hall/panofront.jpg');

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
        this.$world.scene.background = this.envMap;
    }
}


module.exports = SkyBox;