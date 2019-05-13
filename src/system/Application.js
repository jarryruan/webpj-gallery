require('./ThreeExtensions');
const THREE = window.THREE;

const Component = require('./Component');
const config = require('#/config');

class Application extends Component{
    constructor(root){
        super();
        this.$app = this;
        this.$parent = this;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;

        this.root = root;
        this.scene = new THREE.Scene();
        this.setObject(this.scene);

        this._camera = new THREE.PerspectiveCamera(config.camera.fov, aspect, config.camera.near, config.camera.far);
        this._renderer = new THREE.WebGLRenderer({antialias:true});
        this._renderer.setSize(width, height);
        this._renderer.shadowMap.enabled = true;
        this.root.append(this._renderer.domElement);

        this.running = false;
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    setCamera(camera){
        this._camera = camera;
    }


    run(){
        if(!this.running){
            //注册渲染函数
            this.onCreate();
            requestAnimationFrame((() => {
                let prevStamp;
                let render = (timeStamp) => {
                    let deltaTime = prevStamp ? (timeStamp - prevStamp) : 0;
                    this.onRender(deltaTime / 1000.0);

                    this._renderer.render(this.scene, this._camera);
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