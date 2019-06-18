const Component = require('#/system/Component');
const THREE = window.THREE;
const config = require('#/config');

const Bubble = require('./Bubble');


const urls = {
    greeting: require('#/assets/models/Standing Greeting.fbx')
}

const animations = {
    greeting: THREE.asyncLoader.fbx(urls.greeting).then((mesh) => {return mesh.animations[0]}),
};


class NPC extends Component{
    constructor(paintingId, modelURL = urls.greeting){
        super();
        this.modelURL = modelURL;
        this.paintingId = paintingId;
        this.timerId = 0;
    }

    onCreate(){
        this.setObject(new THREE.Group());
        THREE.asyncLoader.fbx(this.modelURL).then(this.meshHandler.bind(this));

        const bubble = this.bubble = new Bubble();
        this.use(bubble);
        bubble.setVisible(false);
        bubble.getObject().position.y = 12;
    }

    onSuspend() {
        super.onSuspend();
        clearInterval(this.timerId);
    }

    meshHandler(mesh){
        mesh.scale.multiplyScalar(0.05);
        mesh.position.set(0, 1, 0);
        mesh.rotation.y = Math.PI;

        this.mixer = mesh.mixer = new THREE.AnimationMixer(mesh);
        this.$world.mixers.push(this.mixer);
        this.getObject().add(mesh);

        this.actions = {};
        Object.keys(animations).forEach((key) => {
            this.actions[key] = animations[key].then((anim) => this.mixer.clipAction(anim));
        });

        this.playAction('greeting');

    }

    playAction(animKey){
        this.actions[animKey].then((action) => {action.play()});
    }

    showBarrage(message, timeout = 5000){
        this.bubble.setText(message);
        this.bubble.setVisible(true);
        setTimeout(() => {this.bubble.setVisible(false)}, timeout);
    }

    intro() {
        config.axiosInstance.get(`/api/paintings/${this.paintingId}/introduction`)
            .then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        
                        let len = response.instruction.length;
                        let i = 0;
                        this.timerId = setInterval(() => {
                            this.showBarrage(response.instruction[i].content, 4000);
                            i = ++i % len;
                        }, 5500);

                    } else this.showBarrage(response.message, 4000)
                } else this.showBarrage("我不知道说什么好", 4000);
            });
    }

    setPaintingId(paintingId) {
        this.paintingId = paintingId;
        this.intro();
    }
}

module.exports = NPC;