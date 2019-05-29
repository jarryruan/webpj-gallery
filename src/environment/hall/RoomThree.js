const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/room3.jpg");

const Floor=require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);

class RoomThree extends Component{
    constructor(){
        super();
        let geometry = new THREE.BoxGeometry(80, 50, 100);
        let materials = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map:texture});
        let result = new THREE.Mesh(geometry,materials);
        result.translateY(25);
        result.translateZ(-240);
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }


    // constructor(){
    //     super();
    //     this.wall1=createCubeWall(10, 200, 900, 0, texture, -651, 100, 0);
    //
    //     this.wall2=createCubeWall(10, 200, 900, 1, texture, 651, 100, 0);
    //
    //     this.wall3=createCubeWall(10, 200, 1310, 1.5,texture, 0, 100, -451);
    //     this.setObject(this.wall1);
    //     this.setObject(this.wall2);
    //     this.setObject(this.wall3);
    // }
    // onCreate() {
    //     super.onCreate();
    // }

}
// function createCubeWall(width, height, depth, angle, material, x, y, z) {
//     var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
//     var cube = new THREE.Mesh(cubeGeometry, material);
//     cube.position.x = x;
//     cube.position.y = y;
//     cube.position.z = z;
//     cube.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
//     return cube;
// }
module.exports=RoomThree;