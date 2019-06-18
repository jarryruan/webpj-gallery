const http = require('http');
// const axios = require('axios');

// function myGetData(){
//     return axios.get('/api/paintings');
// }

const config = require('#/config');

function getData(callback) {
    let options = {
        host: "47.102.212.146",
        port: 8080,
        path: '/api/paintings',
        method: 'GET'
    };
    let req = http.request(options, function (res) {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
           callback(data);
        });
    });
    // req.write();
    req.end();
}
// getData();
module.exports.getData=getData;