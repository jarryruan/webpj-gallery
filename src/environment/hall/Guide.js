const THREE = window.THREE;
const Component = require("#/system/Component");


const floorImg = require("#/assets/textures/room/wood.jpeg");
const Floor=require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
const Sign=require('#/environment/hall/Sign');

const Text=require('#/environment/hall/Text');

class Guide extends Component{
    constructor(){
        super();
        const light = new THREE.PointLight(0xdd992d, 4, 50);
        light.position.y = 35;
        light.position.x = -10;
        light.castShadow = true;

        var geometry = new THREE.CylinderGeometry( 0.6, 0.6, 30, 32 );
        var material = new THREE.MeshPhongMaterial( {color: 0x2a3b00} );
        var cylinder = new THREE.Mesh( geometry, material );
        cylinder.translateZ(-120);
        cylinder.translateY(6);
        this.setObject(cylinder);
        cylinder.add(light);
        cylinder.castShadow = true;

        // this.text1=new Text();
        // let text1=this.text1.getObject();
        // console.log(text1);
        // text1.translateY(10);
        // text1.translateX(4);
        // text1.translateZ(2);
        // text1.rotation.y=-Math.PI/6;
        // this.text1.setObject(text1);
    }

    onCreate() {
        super.onCreate();
        let sign=new Sign();
        let a=sign.getObject();
        // a.translateZ(-120);
        a.translateY(10);
        a.translateX(4);
        a.translateZ(2);
        a.rotation.y=-Math.PI/6;
        sign.setObject(a);
        this.use(sign);
        this.use(this.text1);

        let sign1=new Sign();
        let b=sign1.getObject();
        // a.translateZ(-120);
        b.translateY(12);
        b.translateX(-4);
        b.translateZ(2);
        b.rotation.y=Math.PI/6;
        sign1.setObject(b);
        this.use(sign1);

        let sign2=new Sign();
        let c=sign2.getObject();
        c.translateZ(-4.5);
        c.translateY(14);
        c.rotation.y=Math.PI/2;
        sign2.setObject(c);
        this.use(sign2);
    }
}
module.exports=Guide;