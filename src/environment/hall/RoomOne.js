const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/wallpaper.jpg");

const Floor=require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);

class RoomOne extends Component{
    constructor(){
        super();
        let geometry = new THREE.BoxGeometry(80, 50, 100);
        let materials = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map:texture});
        let result = new THREE.Mesh(geometry,materials);
        result.translateY(25);
        result.translateZ(-80);
        result.translateX(87);
        result.rotation.y=Math.PI/3;
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }


}
module.exports=RoomOne;