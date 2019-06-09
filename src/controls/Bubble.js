const Component = require('#/system/Component');
const THREE = window.THREE;



class Bubble extends Component{
    onCreate(){
        super.onCreate();
        // const material = new THREE.SpriteMaterial({color: 0xffffff});
        const material = new THREE.SpriteMaterial({map: Bubble.bubbleTexture("弹幕消息")});
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 1, 1);
        this.setObject(sprite);
    }

    setText(message){
        this.getObject().material = new THREE.SpriteMaterial({map: Bubble.bubbleTexture(message)});
    }

    setVisible(visible){
        this.getObject().visible = visible;
    }

    static bubbleTexture(messsage){
        const width = 800;
        const height = 80;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px sans-serif";

        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#000000";
        ctx.fillText(messsage, 25, 48);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
}


module.exports = Bubble;