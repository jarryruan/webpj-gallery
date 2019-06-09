const http = require('http');
// const axios = require('axios');

// function myGetData(){
//     return axios.get('/api/paintings');
// }

const config = require('#/config');

function getData(callback) {
    let options = {
        host: config.server.domain,
        port: 80,
        path: '/server/api/paintings',
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