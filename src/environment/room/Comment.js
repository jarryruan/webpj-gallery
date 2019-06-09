const THREE = window.THREE;
const Component = require("#/system/Component");

class Comment extends Component {
    constructor (options) {
        super();

        this.text = options.content;
        this.username = options.username;

        const commentMaterial = new THREE.MeshStandardMaterial({
            color: 0xee00ee,
            side: THREE.DoubleSide
        });
        const commentGeometry = new THREE.OctahedronGeometry(1.0);
        const comment = new THREE.Mesh(commentGeometry, commentMaterial);
        comment.position.y = 2;
        comment.position.x = options.transform.position.x;
        comment.position.z = options.transform.position.z;
        comment.rotation.x = Math.PI / 2;
        comment.rotation.z = options.transform.rotation.y;
        this.setObject(comment);
    }

    highlight(){
        this.getObject().material.color.set(0xff0000);
        this.selected = true;
    }

    unhighlight(){
        this.getObject().material.color.set(0xee00ee);
        this.selected = false;
    }

    getText() {
        return this.text;
    }

    getUsername() {
        return this.username;
    }

}

module.exports = Comment;