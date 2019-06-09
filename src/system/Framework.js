const THREE = window.THREE;

const Component = require('./Component');
const World = require('./World');
const SocketClient = require('#/network/SocketClient');


const UIRoot = require('#/ui/UIRoot');
const React = require('react');
const ReactDOM = require('react-dom');

class Framework{
    constructor(dom){
        this._dom = dom;
        this._world = null;


        this._ui = <UIRoot />;
        ReactDOM.render(this._ui, document.getElementById("ui"));
        this._ui = UIRoot.instance;
        
        this._ui.$framework = this;
        this._client = new SocketClient();

        this._historyWorlds = [];
        this._renderer = new THREE.WebGLRenderer({antialias:true});
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.shadowMap.enabled = true;
        this._dom.append(this._renderer.domElement);

        window.addEventListener('resize', this.onResize.bind(this));
        this.run();
    }

    onResize(){
        if(this._world) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this._world.camera.aspect = width / height;
            this._world.camera.updateProjectionMatrix();
            this._renderer.setSize(width, height);
        }
    }

    getWorld(){
        return this._world;
    }

    setWorld(world){
        if(this._world === world)
            return;

        if(this._world !== null)
            this._world.onSuspend();

        if(!this._historyWorlds.includes(world)){
            world.$dom = this._dom;
            world.$framework = this;
            world.$client = this._client;
            world.$ui = this._ui;

            world.onCreate();
            this._historyWorlds.push(world);
        }else{
            world.onAwake();
        }
        this._world = world;
    }

    export(name, callback){
        if(!window.framework)
            window.framework = {};
        window.framework[name] = callback;
    }

    run(){
        if(!this.running){
            //注册渲染函数
            requestAnimationFrame((() => {
                let prevStamp;
                let render = (timeStamp) => {
                    let deltaTime = prevStamp ? (timeStamp - prevStamp) : 0;

                    if(this._world){
                        this._renderer.render(this._world.scene, this._world.camera);
                        this._world.onRender(deltaTime / 1000.0);
                    }
                    prevStamp = timeStamp;
                    requestAnimationFrame(render);
                };
                return render;
            })());
        }
    }
}


module.exports = Framework;