const Component = require('#/system/Component');
const THREE = window.THREE;

class MovementRestrict extends Component{
    onCreate(){
        super.onCreate();
        this.$parent.restrict = this;
        this.center = new THREE.Vector3(0, 0, -140);
    }

    filter(velocity){
        const position = this.$parent.getObject().position.clone().sub(this.center);
        position.y = 0;

        const length = position.length();

        if(length <= 190)
            return velocity;
        else{
            const dot = velocity.dot(position.clone().normalize());
            if(dot > 0){
                const cast = position.clone().setLength(dot);
                return velocity.sub(cast);
            }else return velocity;
        }
            
    }
}

module.exports = MovementRestrict;