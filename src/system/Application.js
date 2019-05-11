window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');

const Component = require('./Component');

class Application extends Component{
    constructor(root){
        super();
        this.$app = this;
        this.$parent = this;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;

        this.root = root;
        this.object = this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(width, height);
        this.renderer.shadowMap.enabled = true;
        this.root.append(this.renderer.domElement);

        this.onCreate();
        this.running = false;
        window.addEventListener('resize', this.onResize.bind(this));

    }

    onResize(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    run(){
        if(!this.running){
            //注册渲染函数
            requestAnimationFrame((() => {
                let prevStamp;
                let render = (timeStamp) => {
                    let deltaTime = prevStamp ? (timeStamp - prevStamp) : 0;
                    this.onRender(deltaTime / 1000.0);

                    this.renderer.render(this.scene, this.camera);
                    prevStamp = timeStamp;
                    requestAnimationFrame(render);
                };
                return render;
            })());

            this.running = true;
        }
    }
}


module.exports = Application;