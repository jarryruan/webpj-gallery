const domain = window.location.host.split(':')[0];

module.exports = {
    //摄像机设置
    camera: {
        fov: 60,
        near: 1,
        far: 1000
    },

    server:{
        domain: domain,
        root: 'ws://' + domain + ':3000/'
    }
};