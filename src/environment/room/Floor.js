// const floorImg = require("#/assets/textures/floor/FloorsCheckerboard_S_Diffuse.jpg");

const THREE = window.THREE;
const Component = require("#/system/Component");

const loader = new THREE.TextureLoader();

const diff = require('#/assets/textures/floor/tiles_diff.jpg');
const normal = require('#/assets/textures/floor/tiles_normal.jpg');


const diffMap = loader.load(diff);
diffMap.wrapS = diffMap.wrapT = THREE.RepeatWrapping;
diffMap.repeat.set(12, 12);

const normalMap = loader.load(normal);
normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
normalMap.repeat.set(12, 12);

class Floor extends Component {
    constructor() {
        super();

        this.setObject(new THREE.Group());


        const floorMaterial = new THREE.MeshPhongMaterial({
            map: diffMap,
            normalMap: normalMap
        });
        
        const floorGeometry = new THREE.CircleGeometry(200, 32);
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = 0;
        floor.rotation.x = -Math.PI / 2;
        this.getObject().add(floor);


        const wallGeometry = new THREE.CylinderGeometry( 200, 200, 30, 40, 1, true );
        // const wallMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide} );
        const wallMaterial = new THREE.MeshNormalMaterial( {transparent: true, opacity: 0.6, side: THREE.DoubleSide} );
        const wall = new THREE.Mesh( wallGeometry, wallMaterial );
        this.getObject().add(wall);

        const waterGeometry = new THREE.CylinderGeometry( 200, 200, 10, 31); 
        const waterMaterial = new THREE.MeshStandardMaterial( { color: 0x44d4f8, transparent: true, opacity: 0.6 } );
        // this.getObject().add(new THREE.Mesh(waterGeometry, waterMaterial));

    }

    onCreate() {
        super.onCreate();
    }
}

module.exports = Floor;