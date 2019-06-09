// const floorImg = require("#/assets/textures/floor/floor1.jpg");

const brickDiff = require("#/assets/textures/floor/diff.jpg");
const brickNormal = require("#/assets/textures/floor/normal.jpg");

const THREE = window.THREE;
const Component = require("#/system/Component");

const loader = new THREE.TextureLoader();

const textureDiff = loader.load(brickDiff);
textureDiff.wrapS = textureDiff.wrapT = THREE.RepeatWrapping;
textureDiff.repeat.set(100,100);

const textureNormal = loader.load(brickNormal);
textureNormal.wrapS = textureNormal.wrapT = THREE.RepeatWrapping;
textureNormal.repeat.set(100,100);


class Floor extends Component {
    constructor() {
        super();

        const floorMaterial = new THREE.MeshPhongMaterial({
            map: textureDiff,
            normalMap: textureNormal,
            side: THREE.DoubleSide
        });
        const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 5, 5);
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.translateY(1);

        floor.rotation.x = Math.PI / 2;
        floor.receiveShadow = true;
        this.setObject(floor);
    }

    onCreate() {
        super.onCreate();
    }
}

module.exports = Floor;