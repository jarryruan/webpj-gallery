const THREE = window.THREE = require('three');
require('three/examples/js/loaders/GLTFLoader');

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
