const THREE = window.THREE;

class Component{
    constructor(){
        this.$components = [];
    }

    //当组件被创建时执行
    onCreate(){

    }

    //当组件被从父组件删除时执行
    onUnmount(){

    }

    //当Framework切换到其他世界（非本组件所在世界时）时执行
    onSuspend(){
        this.$components.forEach((component) => {component.onSuspend();});
    }

    //当Framework切换从其他世界（非本组件所在世界时）切换到本组件所在世界时执行
    onAwake(){
        this.$components.forEach((component) => {component.onAwake();});
    }

    //每次渲染都会执行
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
            component.$dom = this.$dom;
            component.$framework = this.$framework;
            component.$ui = this.$ui;
            component.$world = this.$world;
            component.$client = this.$client;

            component.$parent = this;

            //调用 onCreate 生命周期
            component.onCreate();
            this.$components.push(component);

            if(this.getObject() instanceof THREE.Object3D && component.getObject() instanceof THREE.Object3D){
                this.getObject().add(component.getObject());
            }

        }
    }

    useAll(components) {
        components.forEach((component) => {
            this.use(component);
        })
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

    unmountAll(components) {
        components.forEach((component) => {
            this.unmount(component);
        })
    }
}


module.exports = Component;