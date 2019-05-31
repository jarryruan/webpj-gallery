const Component = require('#/system/Component');
const THREE = window.THREE;

class Player extends Component{
    constructor(){
        this.geomerty = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        this.mesh = new THREE.Mesh(this.geomerty, this.material);
    }

    onCreate(){
        this.setObject(this.mesh);
    }
}

module.exports = Player;