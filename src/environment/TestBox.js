const THREE = window.THREE;
const Component = require('#/system/Component');

class TestBox extends Component{
    constructor(){
        super();
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshNormalMaterial();
        this.setObject(new THREE.Mesh(geometry, material));
    }

    onCreate() {
        super.onCreate();
    }
}

module.exports = TestBox;