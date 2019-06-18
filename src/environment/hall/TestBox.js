const THREE = window.THREE;
const Component = require('#/system/Component');

class TestBox extends Component{
    constructor(){
        super();
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshNormalMaterial();
        this.setObject(new THREE.Mesh(geometry, material));
        this.rotateSpeed = 1.0;
    }

    onCreate() {
        super.onCreate();
    }

    onRender(deltaTime) {
        super.onRender(deltaTime);
        this.getObject().rotation.y += deltaTime * this.rotateSpeed;
    }

    onSuspend() {
        super.onSuspend();
    }
    onAwake() {
        super.onAwake();
    }
}

module.exports = TestBox;