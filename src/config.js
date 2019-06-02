const domain = window.location.host.split(':')[0];

module.exports = {
    //摄像机设置
    camera: {
        fov: 60,
        near: 1,
        far: 1000
    },

    player: {
        horizontalSensitivity: 0.002,
        verticalSensitivity: 0.002,
        moveSpeed: 15.0,
        frictionFactor: 10.0,
        height: 4.5
    },

    server:{
        domain: domain,
        root: 'ws://' + domain + ':3000/'
    }
};