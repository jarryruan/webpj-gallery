const THREE = window.THREE;
const Component = require("#/system/Component");

class Comment extends Component {
    constructor (options) {
        super();

        this.text = options.content;
        this.username = options.username;

        const commentMaterial = new THREE.MeshBasicMaterial({
            color: 0xee00ee,
            side: THREE.DoubleSide
        });
        const commentGeometry = new THREE.PlaneGeometry(20, 12, 5, 5);
        const comment = new THREE.Mesh(commentGeometry, commentMaterial);
        comment.position.y = 0.1;
        comment.position.x = options.transform.position.x;
        comment.position.z = options.transform.position.z;
        comment.rotation.x = Math.PI / 2;
        comment.rotation.z = options.transform.rotation.y;
        this.setObject(comment);
    }

    getText() {
        return this.text;
    }

    getUsername() {
        return this.username;
    }

}

module.exports = Comment;