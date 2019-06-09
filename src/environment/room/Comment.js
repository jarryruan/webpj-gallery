const THREE = window.THREE;
const Component = require("#/system/Component");

class Comment extends Component {
    constructor (options) {
        super();

        this.text = options.content;
        this.username = options.username;

        const commentMaterial = new THREE.MeshStandardMaterial({
            color: 0x22b14c,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0
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
        this.getObject().material.color.set(0xffb400);
        this.getObject().material.opacity = 1.0;
        this.selected = true;
    }

    unhighlight(){
        this.getObject().material.color.set(0x22b14c);
        this.getObject().material.opacity = 0.3;
        this.selected = false;
    }

    onRender(deltaTime){
        super.onRender(deltaTime);
        this.getObject().rotation.z += deltaTime;
    }

    getText() {
        return this.text;
    }

    getUsername() {
        return this.username;
    }

}

module.exports = Comment;