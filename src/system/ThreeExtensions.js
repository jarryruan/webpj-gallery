const THREE = window.THREE = require('three');
const Zlib = window.Zlib = require('./inflate.min.js').Zlib;

require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/loaders/FBXLoader');

THREE.Object3D.prototype.forward = function(){
    var v = new THREE.Vector3(0, 0, -1);
    v.applyQuaternion(this.quaternion);
    return v.normalize();
}

THREE.Object3D.prototype.left = function(){
    var v = new THREE.Vector3(-1, 0, 0);
    v.applyQuaternion(this.quaternion);
    return v.normalize();
}

THREE.Object3D.prototype.right = function(){
    var v = new THREE.Vector3(1, 0, 0);
    v.applyQuaternion(this.quaternion);
    return v.normalize();
}


THREE.Object3D.prototype.backward = function(){
    var v = new THREE.Vector3(0, 0, 1);
    v.applyQuaternion(this.quaternion);
    return v.normalize();
}


const loader = new THREE.FBXLoader();
THREE.asyncLoader = {
    fbx: function(url){
        return new Promise((resolve, reject) => {
            loader.load(url, (mesh) => {resolve(mesh)}, null, (error) => {reject(error)});
        });
    }
};