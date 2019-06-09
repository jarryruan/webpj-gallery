require('../../assets/lib/threebsp');
const THREE = window.THREE;
const Component = require("#/system/Component");

const Image=require('#/assets/textures/room/sign.jpg');
const loader = new THREE.TextureLoader();
const texture = loader.load(Image);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
class DoorFrame extends Component{
    constructor(){
        super();
        let bigDoor = new THREE.BoxGeometry(10, 20, 1.4);
        let innerDoor=new THREE.BoxGeometry(9,19,1.4);
        let door1=new THREE.Mesh(bigDoor);
        let door2=new THREE.Mesh(innerDoor);
        let MeshDoor1=new ThreeBSP(door1);
        let MeshDoor2=new ThreeBSP(door2);
        door1=MeshDoor1.subtract(MeshDoor2).toMesh();
        let material=new THREE.MeshBasicMaterial({color:0x2a3b00});
        door1.material=material;
        door1.translateY(10);
        this.setObject(door1);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=DoorFrame;