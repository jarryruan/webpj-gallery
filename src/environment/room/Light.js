const Component = require('#/system/Component');
const THREE = window.THREE;

class Light extends Component{
    onCreate(){
        super.onCreate();
        this.setObject(new THREE.Group());

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(100, 100, 100);
        this.getObject().add(ambientLight);
        this.getObject().add(directionalLight);
        // this.getObject().add(spotLight)
    }
}

module.exports = Light;