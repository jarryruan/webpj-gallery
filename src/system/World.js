const THREE = window.THREE;
const Component = require('./Component');
const config = require('#/config');


class World extends Component{
    constructor(){
        super();
        this.$world = this;
        this.$parent = null;

        const aspect = window.innerWidth / window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(config.camera.fov, aspect, config.camera.near, config.camera.far);
        this.setObject(this.scene);
    }


    setCamera(camera){
        this.camera = camera;
    }
}

module.exports = World;