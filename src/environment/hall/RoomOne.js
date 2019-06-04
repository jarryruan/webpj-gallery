require('../../../lib/threebsp');
const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/wallpaper.jpg");

const Floor = require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);
const Wall = require('#/environment/hall/Wall');
const Roof=require('#/environment/hall/Roof');

class RoomOne extends Component {
    constructor() {
        super();
        let frontWall = new THREE.BoxGeometry(0, 0, 0);
        let materials = new THREE.MeshBasicMaterial({map: texture});
        let result1 = new THREE.Mesh(frontWall, materials);


        this.setObject(result1);
        this.wall1 = new Wall();
        this.wall2 = new Wall();
        this.wall3 = new Wall();
        this.wall4 = new Wall();
        this.roof=new Roof();


        let roof=this.roof.getObject();
        // roof.translate(100,100,50);
        roof.translateX(100);
        roof.translateY(-100);
        roof.translateZ(-50);
        roof.material=materials;
        this.roof.setObject(roof);


        let aa = this.wall1.getObject();
        aa.translateZ(-140);
        aa.translateX(100);
        aa.material = materials;
        this.wall1.setObject(aa);

        let bb = this.wall2.getObject();
        bb.translateZ(-60);
        bb.translateX(100);
        bb.material = materials;
        this.wall2.setObject(bb);

        let a = this.wall3.getObject();
        a.rotation.y = Math.PI / 2;
        a.translateX(100);
        a.translateZ(140);
        a.material = materials;
        this.wall3.setObject(a);

        let b = this.wall4.getObject();
        b.rotation.y = Math.PI / 2;
        b.translateX(100);
        b.translateZ(60);
        let door = new THREE.BoxGeometry(10, 20, 0);
        let doors = new THREE.Mesh(door);
        doors.rotation.y = Math.PI / 2;
        doors.translateZ(60);
        doors.translateX(100);
        doors.translateY(10);
        let meshH4Door = new ThreeBSP(doors);
        let meshH4Wall = new ThreeBSP(b);
        let resultBSP = meshH4Wall.subtract(meshH4Door);
        b = resultBSP.toMesh();
        b.material = materials;
        this.wall4.setObject(b);

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

module.exports = RoomOne;

