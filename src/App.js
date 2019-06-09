const Framework = require('#/system/Framework');
const HallWorld = require('#/worlds/HallWorld');
const RoomWorld = require('#/worlds/RoomWorld');

class App{
    constructor(dom){
        //初始化框架 与 新建世界
        const framework = new Framework(dom);
        const worlds = {
            hall: new HallWorld(),
            room: new RoomWorld()
        };
        framework.setWorld(worlds['hall']);

        //在浏览器的 Console 执行 framework.view('世界名'); 即可执行以下方法
        framework.export("view", (key) => {
            if(worlds[key])
                framework.setWorld(worlds[key]);
        });

        //在浏览器的 Console 执行 framework.openRoom(options); 即可执行以下方法
        framework.export("openRoom", (options) => {
            worlds.room.update(options);
            framework.setWorld(worlds['room']);
        });

        framework._ui.show({}, 'login');
    }
}

module.exports = App;