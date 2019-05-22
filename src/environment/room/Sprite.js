const THREE = window.THREE;
const Component = require('#/system/Component');

class Sprite extends Component {
    constructor () {
        super();
        let spriteMaterial = new THREE.SpriteMaterial({color: 0xffffff});

        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(200, 200, 1)

        this.setObject(sprite)
    }
}

module.exports = Sprite;