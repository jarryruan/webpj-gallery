const leftTexture = require('#/assets/textures/skybox/hall/panoleft.jpeg');
const rightTexture = require('#/assets/textures/skybox/hall/panoright.jpeg');
const topTexture = require('#/assets/textures/skybox/hall/panotop.jpeg');
const bottomTexture = require('#/assets/textures/skybox/hall/panobottom.jpeg');
const backTexture = require('#/assets/textures/skybox/hall/panoback.jpeg');
const frontTexture = require('#/assets/textures/skybox/hall/panofront.jpeg');

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