const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/room3.jpg");

const Floor=require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);
const Wall=require('#/environment/hall/Wall');
const Roof=require('#/environment/hall/Roof');

class RoomThree extends Component {
    constructor() {
        super();
        let geometry = new THREE.BoxGeometry(0, 0, 0);
        let materials = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: texture});
        let result = new THREE.Mesh(geometry, materials);
        this.setObject(result);

        this.wall1 = new Wall();
        this.wall2 = new Wall();
        this.wall3 = new Wall();
        this.wall4 = new Wall();

        this.roof = new Roof();


        let roof = this.roof.getObject();
        roof.translateY(-220);
        roof.translateZ(-50);
        roof.material = materials;
        this.roof.setObject(roof);


        let aa = this.wall1.getObject();
        aa.translateZ(-260);
        aa.material = materials;
        this.wall1.setObject(aa);
        let a = this.wall3.getObject();
        a.rotation.y = Math.PI / 2;
        // a.translateX();
        a.translateZ(40);
        a.translateX(220);
        a.material = materials;
        this.wall3.setObject(a);
        let b = this.wall4.getObject();
        b.rotation.y = Math.PI / 2;
        b.translateZ(-40);
        b.translateX(220);
        b.material = materials;
        this.wall4.setObject(b);

        let bb = this.wall2.getObject();
        bb.translateZ(-180);
        bb.material = materials;
        let door = new THREE.BoxGeometry(10, 20, 0);
        let doors = new THREE.Mesh(door);
        // doors.rotation.y=Math.PI/2;
        doors.translateZ(-180);
        doors.translateY(10);
        let meshH4Door = new ThreeBSP(doors);
        let meshH4Wall = new ThreeBSP(bb);
        let resultBSP = meshH4Wall.subtract(meshH4Door);
        bb = resultBSP.toMesh();
        bb.material = materials;

        this.wall2.setObject(bb);


    }

    onCreate() {
        super.onCreate();
        this.use(this.wall1);
        this.use(this.wall2);
        this.use(this.wall3);
        this.use(this.wall4);
        this.use(this.roof);
    }
}
module.exports=RoomThree;