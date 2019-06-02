const THREE = window.THREE;
const Component = require("#/system/Component");

class Comment extends Component {
    constructor (text, x, y) {
        super();

        this.text = text;

        const commentMaterial = new THREE.MeshBasicMaterial({
            color: 0xee00ee,
            side: THREE.DoubleSide
        });
        const commentGeometry = new THREE.PlaneGeometry(20, 12, 5, 5);
        const comment = new THREE.Mesh(commentGeometry, commentMaterial);
        comment.position.y = 0.1;
        comment.position.x = x;
        comment.position.z = -y;
        comment.rotation.x = Math.PI / 2;
        this.setObject(comment);
    }

    getText() {
        return this.text;
    }

}

module.exports = Comment;