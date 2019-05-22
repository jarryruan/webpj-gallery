const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/wallpaper.jpg");
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

class RoomCenter extends Component{
    constructor(){
        super();
        let geometry = new THREE.BoxGeometry(80, 60, 100);
        let materials = new THREE.MeshBasicMaterial({color: 0x000011,side:THREE.DoubleSide,map:texture});
        let result = new THREE.Mesh(geometry,materials);
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=RoomCenter;