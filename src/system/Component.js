class Component{
    constructor(){
        this.$components = [];
        this.object = new THREE.Group();
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
        if(this.object instanceof THREE.Object3D){
            return this.object
        }else{
            return null;
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

        }
    }

    unmount(component){
        if(!this.$components.includes(component))
            return;

        component.onUnmount();
        this.$components = this.$components.filter((cpm) => cpm !== component);
    }
}


module.exports = Component;