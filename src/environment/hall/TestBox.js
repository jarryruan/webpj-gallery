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
        console.log("TestBox: onSuspend 被调用，进入睡眠状态");
    }
    onAwake() {
        super.onAwake();
        console.log("TestBox: onAwake 被调用，从睡眠中恢复");
    }
}

module.exports = TestBox;