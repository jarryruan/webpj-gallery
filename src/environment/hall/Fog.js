const Component = require('#/system/Component')
const THREE = window.THREE;

class Fog extends Component{
    onCreate(){
        super.onCreate();
        const fog = new THREE.Fog(0xffffff, 10, 300);
        // this.$world.scene.fog = fog;
    }
}

module.exports = Fog;