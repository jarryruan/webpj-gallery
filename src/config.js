const domain = window.location.host.split(':')[0];
const axios = require("axios");

axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': "application/x-www-form-urlencoded"
        };
        return config;
    }
);

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
        moveSpeed: 30.0,
        frictionFactor: 10.0,
        height: 4.5
    },

    server:{
        domain: domain,
        root: 'ws://' + domain + ':3000/'
    },

    axiosInstance: axios.create({
        baseURL: "/server",
        timeout: 5000,
        withCredentials: true // 允许携带cookie
    }),
    // api: "188.131.187.85:9999"
};