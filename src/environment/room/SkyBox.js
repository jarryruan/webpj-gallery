const leftTexture = require('#/assets/textures/skybox/room/panoleft.jpeg');
const rightTexture = require('#/assets/textures/skybox/room/panoright.jpeg');
const topTexture = require('#/assets/textures/skybox/room/panotop.jpeg');
const bottomTexture = require('#/assets/textures/skybox/room/panobottom.jpeg');
const backTexture = require('#/assets/textures/skybox/room/panoback.jpeg');
const frontTexture = require('#/assets/textures/skybox/room/panofront.jpeg');

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