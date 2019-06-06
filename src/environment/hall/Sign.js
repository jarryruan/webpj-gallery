const THREE = window.THREE;
const Component = require("#/system/Component");
const Text=require('#/environment/hall/Text');

const Image=require('#/assets/textures/room/sign.jpg');
const loader = new THREE.TextureLoader();
const texture = loader.load(Image);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

class Sign extends Component{
    constructor(){
        super();
        let sign=new THREE.BoxGeometry(9,2,0.3);

        let materials = new THREE.MeshPhongMaterial({side:THREE.DoubleSide,map:texture});
        let result = new THREE.Mesh(sign,materials);
        result.castShadow = true;

        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Sign;