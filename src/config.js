const domain = window.location.host.split(':')[0];

module.exports = {
    //场景设置
    scene: {
        fov: 60,
        near: 1,
        far: 1000
    },

    floor:{
        size: 1000.0
    },

    player:{
        horizontalSensity: 0.002,
        verticalSensity: 0.002,
        moveSpeed: 25.0,
        frictionFactor: 10.0,
        syncSpeed: 1.0
    },

    server:{
        root: 'ws://' + domain + ':3000/'
    }
}