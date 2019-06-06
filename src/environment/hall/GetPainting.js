const http = require('http');


function getData() {
    // let options = {
    //     host: '188.131.187.85',
    //     port: 9999,
    //     path: '/api/paintings',
    //     method: 'GET'
    // };
    // let req = http.request(options, function (res) {
    //     let data = '';
    //     res.on('data', function (chunk) {
    //         data += chunk;
    //     });
    //     res.on('end', function () {
    //        callback(data);
    //     });
    // });
    // // req.write();
    // req.end();
    let xmlhttp = new XMLHttpRequest();
    // get方法带参数是将参数写在url里面传过去给后端
    xmlhttp.open("GET", "http://188.131.187.85:9999/api/paintings", true);
    xmlhttp.send();
    // readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return(xmlhttp.responseText);
        }
    }
}
//
// function transform(){
//     getData(function (res) {
//         if (res){
//             let result=JSON.parse(res);
//             if (result.result){
//
//
//             }
//         }
//     })
// }
// transform();
// getData();
module.exports.getData=getData;