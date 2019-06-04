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

        let materials = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,map:texture});
        let result = new THREE.Mesh(sign,materials);
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
        let text=new Text();
        this.use(text);
    }
}
module.exports=Sign;