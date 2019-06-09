const THREE = window.THREE;
const Component = require("#/system/Component");

class Painting extends Component{
    constructor(){
        super();
        let frame=new THREE.BoxGeometry(15,15,0);
        let image = require("#/assets/textures/room/wood.jpeg");
        const loader = new THREE.TextureLoader();
        let texture = loader.load(image);
        let material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map:texture});
        let frames=new THREE.Mesh(frame,material);
        frames.translateY(20);
        this.setObject(frames);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Painting;