
const THREE = window.THREE;
const Component = require("#/system/Component");

const loader = new THREE.TextureLoader();

class Canvas extends Component {
    constructor(url) {
        super();
        this.setObject(new THREE.Group());
        const texture = loader.load(url);

        const canvasMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        const canvasGeometry = new THREE.PlaneGeometry(160, 90, 5, 5);
        const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
        // canvas.position.y = 45;
        // canvas.position.z = -100;
        this.getObject().add(canvas);
        


    }

    onCreate() {
        super.onCreate();
    }
}

module.exports = Canvas;