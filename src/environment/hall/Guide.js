const THREE = window.THREE;
const Component = require("#/system/Component");


const floorImg = require("#/assets/textures/room/wood.jpeg");

const Floor=require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

class Guide extends Component{
    constructor(){
        super();
        var geometry = new THREE.CylinderGeometry( 0.6, 0.6, 20, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0x2a3b00} );
        var cylinder = new THREE.Mesh( geometry, material );
        cylinder.translateZ(-120);
        cylinder.translateY(6);
        this.setObject(cylinder);
    }

    onCreate() {
        super.onCreate();
    }
}
module.exports=Guide;