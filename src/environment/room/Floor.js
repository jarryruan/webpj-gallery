const floorImg = require("#/assets/textures/floor/FloorsCheckerboard_S_Diffuse.jpg");

const THREE = window.THREE;
const Component = require("#/system/Component");

const loader = new THREE.TextureLoader();

const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);


class Floor extends Component {
    constructor() {
        super();

        const floorMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        const floorGeometry = new THREE.PlaneGeometry(500, 500, 5, 5);
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = 0;
        floor.rotation.x = Math.PI / 2;
        this.setObject(floor);
    }

    onCreate() {
        super.onCreate();
    }
}

module.exports = Floor;