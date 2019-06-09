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

        this.text1=new Text("Picasso");
        let text1=this.text1.getObject();
        text1.translateY(9.8);
        text1.translateX(4);
        text1.translateZ(2.5);
        text1.rotation.y=-Math.PI/6;
        text1.geometry.text="Picasso";

        this.text2=new Text("Picasso");
        let text2=this.text2.getObject();
        text2.translateY(9.8);
        text2.rotation.y=5*Math.PI/6;
        text2.translateX(-4.5);
        text2.translateZ(0.5);
        this.text2.setObject(text2);

        this.text3=new Text("Da Vinci");
        let text3=this.text3.getObject();
        text3.translateY(11.8);
        text3.translateX(-4);
        text3.translateZ(2.5);
        text3.rotation.y=Math.PI/6;
        this.text3.setObject(text3);

        this.text4=new Text("Da Vinci");
        let text4=this.text4.getObject();
        text4.translateY(11.8);
        text4.translateX(-4);
        text4.translateZ(1.5);
        text4.rotation.y=-5*Math.PI/6;
        this.text4.setObject(text4);

        this.text5=new Text("Van Gogh");
        let text5=this.text5.getObject();
        text5.translateY(13.8);
        text5.translateX(0.5);
        text5.translateZ(-4.5);
        text5.rotation.y=Math.PI/2;
        this.text5.setObject(text5);

        this.text6=new Text("Van Gogh");
        let text6=this.text6.getObject();
        text6.translateY(13.8);
        text6.translateX(-0.5);
        text6.translateZ(-4.5);
        text6.rotation.y=-Math.PI/2;
        this.text6.setObject(text6);
        

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

        this.use(this.text1);
        this.use(this.text2);
        this.use(this.text3);
        this.use(this.text4);
        this.use(this.text5);
        this.use(this.text6);
    }
}
module.exports=Guide;