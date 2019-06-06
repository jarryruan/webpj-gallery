const THREE = window.THREE;
const Component = require("#/system/Component");

class Text extends Component{
    constructor(){
        super();
        let loader=new THREE.FontLoader();
        loader.load('../../../lib/helvetiker_regular.typeface.json', function ( font ){
            let text = new THREE.TextGeometry("initial", {
                size: 14, height: 1.7, weight: 'normal', style: 'normal'
            });
            text.center();
            let material = new THREE.MeshBasicMaterial({color:0x000000});
            let result = new THREE.Mesh(text,material);
            // result.translateY(50);
            this.setObject(result);
        });
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Text;