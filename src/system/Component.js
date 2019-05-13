const THREE = window.THREE;

class Component{
    constructor(){
        this.$components = [];
    }

    onCreate(){

    }

    onUnmount(){

    }

    onRender(deltaTime){
        this.$components.forEach((component) => {component.onRender(deltaTime);});
    }

    //获取原生 three.js 对象
    getObject(){
        if (this._object instanceof THREE.Object3D) {
            return this._object;
        }
        return null;
    }

    setObject(object){
        this._object = object;
    }

    findSubObject(name){
        if(this.getObject() instanceof THREE.Object3D){
            return this.getObject().getObjectByName(name);
        }
    }

    use(component){
        //依赖注入
        if(component instanceof Component){
            component.$app = this.$app;
            component.$parent = this;

            //调用 onCreate 生命周期
            component.onCreate();
            this.$components.push(component);

            if(this.getObject() instanceof THREE.Object3D && component.getObject() instanceof THREE.Object3D){
                this.getObject().add(component.getObject());
            }

        }
    }

    unmount(component){
        if(!this.$components.includes(component))
            return;

        component.onUnmount();
        this.$components = this.$components.filter((cpm) => cpm !== component);

        if(this.getObject() instanceof THREE.Object3D && component.getObject() instanceof THREE.Object3D){
            this.getObject().remove(component.getObject());
        }
    }
}


module.exports = Component;