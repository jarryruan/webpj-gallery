const Component = require('#/system/Component');
const THREE = window.THREE;

class RoomLight extends Component{
    constructor(){
        super();
        this.setObject(new THREE.Group());
        
        const light = new THREE.PointLight(0xff9600, 0.5, 150);
        light.position.set(-20, 45, 0);
        this.getObject().add(light);
    }

    onCreate(){
        super.onCreate();
    }
}

module.exports = RoomLight;