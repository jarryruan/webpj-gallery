require('../../assets/lib/threebsp');
const THREE = window.THREE;
const Component = require("#/system/Component");

const Image=require('#/assets/textures/room/sign.jpg');
const loader = new THREE.TextureLoader();
const texture = loader.load(Image);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
class PaintingFrame extends Component{
    constructor(){
        super();
        let bigPainting = new THREE.BoxGeometry(16, 16, 1.4);
        let innerPainting=new THREE.BoxGeometry(15,15,1.4);
        let painting1=new THREE.Mesh(bigPainting);
        let painting2=new THREE.Mesh(innerPainting);
        let MeshPainting1=new ThreeBSP(painting1);
        let MeshPainting2=new ThreeBSP(painting2);
        painting1=MeshPainting1.subtract(MeshPainting2).toMesh();
        let material=new THREE.MeshBasicMaterial({color:0xffffff});
        painting1.material=material;
        painting1.translateY(20);
        this.setObject(painting1);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=PaintingFrame;