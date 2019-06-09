const THREE = window.THREE;
const Component = require("#/system/Component");

const typeface = require('three/examples/fonts/helvetiker_regular.typeface.json');


class Text extends Component{
    constructor(text1){
        super();

        let loader=new THREE.FontLoader();

        let text = new THREE.TextGeometry(text1, {
            size: 1, height: 0.2, weight: 'normal', style: 'normal', font: loader.parse(typeface)
        });
        text.center();
        let material = new THREE.MeshBasicMaterial({color:0x000000});
        let result = new THREE.Mesh(text, material);


        this.setObject(result);
    }
    onCreate() {
        super.onCreate();
    }
}
module.exports=Text;