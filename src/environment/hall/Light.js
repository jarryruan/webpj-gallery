const Component = require('#/system/Component');


class Light extends Component{
    onCreate(){
        const group = new THREE.Group();
        const ambientLight = new THREE.AmbientLight(0x384e73, 1.0);
        const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI/2, 0.5);
        spotLight.position.set(0, 10, 10);
        // const directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
        // directionLight.castShadow = true;

        group.add(ambientLight);
        group.add(spotLight);
        // group.add(directionLight);
        this.setObject(group);
    }
}

module.exports = Light;