const Framework = require('#/system/Framework');
const HallWorld = require('#/worlds/HallWorld');
const World = require('#/system/World');

class App{
    constructor(dom){
        //初始化框架 与 新建世界
        const framework = new Framework(dom);
        const worlds = [new HallWorld(), new World()] ;
        framework.setWorld(worlds[0]);

        //在浏览器的 Console 执行 framework.switch(); 即可执行以下方法
        framework.export("switch", () => {
            if(framework.getWorld() === worlds[0])
                framework.setWorld(worlds[1]);
            else
                framework.setWorld(worlds[0]);
        });
    }
}

module.exports = App;