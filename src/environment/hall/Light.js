const Component = require('#/system/Component');


class Light extends Component{
    onCreate(){
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        this.setObject(light);
    }
}

module.exports = Light;