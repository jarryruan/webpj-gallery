const Component = require('#/system/Component');
const THREE = window.THREE;
const config = require('#/config');

const Bubble = require('./Bubble');


const urls = {
    samba: require('#/assets/models/samba.fbx'),
    running: require('#/assets/models/running.fbx'),
    idle: require('#/assets/models/idle.fbx'),
    walking: require('#/assets/models/walking.fbx'),
}

const animations = {
    idle: THREE.asyncLoader.fbx(urls.idle).then((mesh) => {return mesh.animations[0]}),
    walking: THREE.asyncLoader.fbx(urls.running).then((mesh) => {return mesh.animations[0]}),
};


class Player extends Component{
    constructor(modelURL = urls.samba){
        super();
        this.modelURL = modelURL;
    }

    onCreate(){
        this.setObject(new THREE.Group());
        THREE.asyncLoader.fbx(this.modelURL).then(this.meshHandler.bind(this));

        this.target = {
            position: new THREE.Vector3(),
            rotation: new THREE.Vector3()
        };
        
        const bubble = this.bubble = new Bubble();
        this.use(bubble);
        bubble.setVisible(false);
        bubble.getObject().position.y = 12;
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

        this.playAction('idle');
        this.playAction('walking');
        
    }

    playAction(animKey){
        this.actions[animKey].then((action) => {action.play()});
    }

    stopAction(animKey){
        this.actions[animKey].then((action) => {action.stop()});
    }

    setTimeScale(animKey, scale){
        this.actions['walking'].then((walking) => {walking.timeScale = scale});
    }

    onRender(deltaTime){
        super.onRender(deltaTime);
        // const distance = this.getObject().position.distanceTo(this.target.position);
        const distance = this.target.position.clone().sub(this.getObject().position).dot(this.getObject().forward());


        if(this.mixer){
            this.setTimeScale("walking", distance);
        }

        this.getObject().position.lerp(this.target.position, 15.0 * deltaTime);
        this.getObject().rotation.set(this.target.rotation.x, this.target.rotation.y, this.target.rotation.z)
        
    }

    moveTo(position, rotation){
        this.target.position.set(position.x, position.y, position.z);
        this.target.rotation.set(rotation.x, rotation.y, rotation.z);
    }
    
    showBarrage(message, timeout = 5000){
        this.bubble.setText(message);
        this.bubble.setVisible(true);
        setTimeout(() => {this.bubble.setVisible(false)}, timeout);
    }
}

module.exports = Player;