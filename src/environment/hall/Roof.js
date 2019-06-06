const THREE = window.THREE;
const Component = require("#/system/Component");
// texture.repeat.set(4, 4);
class Roof extends Component{
    constructor(){
        super();
        let roof = new THREE.BoxGeometry(80, 80, 0);
        // let materials = new THREE.MeshBasicMaterial({map:texture});
        let result=new THREE.Mesh(roof);
        // result.translateY(25);
        result.rotation.x=Math.PI/2;
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Roof;