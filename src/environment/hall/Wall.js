const THREE = window.THREE;
const Component = require("#/system/Component");
// texture.repeat.set(4, 4);
class Wall extends Component{
    constructor(){
        super();
        let wall = new THREE.BoxGeometry(80, 50, 0);
        // let materials = new THREE.MeshBasicMaterial({map:texture});
        let result=new THREE.Mesh(wall);
        result.translateY(25);
        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Wall;