const http = require('http');
// const axios = require('axios');

// function myGetData(){
//     return axios.get('/api/paintings');
// }


function getData(callback) {
    let options = {
        host: '188.131.187.85',
        port: 9999,
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