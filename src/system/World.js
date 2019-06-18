const THREE = window.THREE;
const Component = require('./Component');
const config = require('#/config');


class World extends Component{
    constructor(name){
        super();
        this.name = name;
        this.$world = this;
        this.$parent = null;
        this.mixers = [];

        const aspect = window.innerWidth / window.innerHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(config.camera.fov, aspect, config.camera.near, config.camera.far);
        this.setObject(this.scene);
    }

    addEventListener(eventName, callback, dom = this.$dom){
        dom.addEventListener(eventName, (event) => {
            if(this.$framework.getWorld().name === this.name){
                callback(event);
            }
        });
    }

    onAwake(){
        super.onAwake();
        this.$framework.onResize();
    }


    setCamera(camera){
        this.camera = camera;
    }
    
    onRender(deltaTime){
        super.onRender(deltaTime);
        this.mixers.forEach((mixer) => {
            mixer.update(deltaTime);
        })
    }
}

module.exports = World;