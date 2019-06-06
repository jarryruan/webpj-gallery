const Component = require('#/system/Component')
const THREE = window.THREE;

const geometry = new THREE.BoxGeometry( 500, 500, 500 );
const material = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.BackSide} );


class Building extends Component{
    onCreate(){
        super.onCreate();
        const cube = new THREE.Mesh( geometry, material );
        this.setObject(cube);
    }
}

module.exports = Building;