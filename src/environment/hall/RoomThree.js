require('../../assets/lib/threebsp');
const THREE = window.THREE;
const Component = require("#/system/Component");
const floorImg = require("#/assets/textures/room/room1.jpeg");

const Floor = require('#/environment/hall/Floor');
const loader = new THREE.TextureLoader();
const texture = loader.load(floorImg);
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);
const Wall = require('#/environment/hall/Wall');
const Roof = require('#/environment/hall/Roof');
const DoorFrame = require('#/environment/hall/DoorFrame');
const Painting = require('#/environment/hall/Painting');
const PaintingFrame=require('#/environment/hall/PaintingFrame');
const getPainting = require("#/environment/hall/GetPainting");

const FirstPersonController = require('#/controls/FirstPersonController');
const RoomLight=require('#/environment/hall/RoomLight');

class RoomThree extends Component {
    constructor() {
        super();
        let geometry = new THREE.BoxGeometry(0, 0, 0);
        let materials = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, map: texture});
        // let result = new THREE.Mesh(geometry, materials);
        // this.setObject(result);
        this.data=[];
        
        this.wall1 = new Wall();
        this.wall2 = new Wall();
        this.wall3 = new Wall();
        this.wall4 = new Wall();
        this.controller = new FirstPersonController();

        this.light = new RoomLight();

        this.paintings = [];
        this.paintingFrames = [];
        this.roof = new Roof();
        this.doorFrame = new DoorFrame();

        this.addRoof(materials);

        this.addWall(materials);

        this.addDoor(materials);

        this.addPainting();

        let group = new THREE.Group(this.wall1, this.wall2, this.wall3, this.wall4, this.roof, this.doorFrame);
        group.translateZ(-220);
        // group.translateX(-100);
        // group.translateY(25);
        this.setObject(group);

    }

    addWall(materials) {
        let aa = this.wall1.getObject();
        aa.translateZ(-40);
        aa.material = materials;
        this.wall1.setObject(aa);

        let a = this.wall3.getObject();
        a.rotation.y = Math.PI / 2;
        // a.translateX();
        a.translateZ(40);
        // a.translateX(220);
        a.material = materials;
        this.wall3.setObject(a);

        let b = this.wall4.getObject();
        b.rotation.y = Math.PI / 2;
        b.translateZ(-40);
        // b.translateX(220);
        b.material = materials;
        this.wall4.setObject(b);
    }

    addDoor(materials) {

        //带门的墙
        let bb = this.wall2.getObject();
        bb.translateZ(40);
        bb.material = materials;
        let door = new THREE.BoxGeometry(10, 20, 0);
        let doors = new THREE.Mesh(door);
        // doors.rotation.y=Math.PI/2;
        doors.translateZ(40);
        doors.translateY(10);
        let meshH4Door = new ThreeBSP(doors);
        let meshH4Wall = new ThreeBSP(bb);
        let resultBSP = meshH4Wall.subtract(meshH4Door);
        bb = resultBSP.toMesh();
        bb.material = materials;

//门框
        let d = this.doorFrame.getObject();
        d.translateZ(40);
        this.doorFrame.setObject(d);
        this.wall2.setObject(bb);

    }

    addRoof(materials) {
        let roof = this.roof.getObject();
        // roof.translateY(-220);
        roof.translateZ(-50);
        roof.material = materials;
        this.roof.setObject(roof);
    }

    addPainting() {
        let paints = [];
        let paintFrames=[];
        for (let i = 0; i < 11; i++) {
            this.paintings[i] = new Painting();
            this.paintingFrames[i]=new PaintingFrame();
            paints[i] = this.paintings[i].getObject();
            paintFrames[i]=this.paintingFrames[i].getObject();
        }
        paints[0].translateZ(39);
        paints[0].translateX(-20);

        paints[1].translateZ(39);
        paints[1].translateX(20);
        paintFrames[0].translateZ(39);
        paintFrames[0].translateX(-20);

        paintFrames[1].translateZ(39);
        paintFrames[1].translateX(20);

        for (let i = 2; i < 5; i++) {
            paints[i].rotation.y = Math.PI / 2;
            paints[i].translateX(-40 + 8.75 * (i - 1) + 15 * (i - 3 / 2));
            paints[i].translateZ(39);
            paintFrames[i].rotation.y = Math.PI / 2;
            paintFrames[i].translateX(-40 + 8.75 * (i - 1) + 15 * (i - 3 / 2));
            paintFrames[i].translateZ(39)
        }
        for (let i = 5; i < 8; i++) {
            paints[i].translateZ(-39);
            paintFrames[i].translateZ(-39);
            // paints[i].translateX(40-8.75*(i-4)-15*(i-3/2));
        }
        paints[5].translateX(25);
        paints[7].translateX(-25);

        paintFrames[5].translateX(25);
        paintFrames[7].translateX(-25);
        for (let i = 8; i < 11; i++) {
            paints[i].rotation.y = Math.PI / 2;
            paints[i].translateZ(-39);
            paints[i].translateX(40 - 8.75 * (i - 7) - 15 * (i - 15 / 2));
            paintFrames[i].rotation.y = Math.PI / 2;
            paintFrames[i].translateZ(-39);
            paintFrames[i].translateX(40 - 8.75 * (i - 7) - 15 * (i - 15 / 2));
        }
        getPainting.getData((data)=>{
            // this.data=data;
            if(data){
                let result=JSON.parse(data);
                let paintings=result.paintings;
                let a=0;
                for (let i=0;i<paintings.length;i++){
                    if (paintings[i].houseId===1&&a<paints.length){
                        this.data[a]=paintings[i];
                        let texture=loader.load(paintings[i].paintingPath);
                        paints[a++].material.map=texture;
                    }
                } 
            }
        });
        for (let i = 0; i < 11; i++) {
            this.paintings[i].setObject(paints[i]);
            this.paintingFrames[i].setObject(paintFrames[i]);
        }

    }

    onCreate() {
        super.onCreate();
        this.use(this.wall1);
        this.use(this.wall2);
        this.use(this.wall3);
        this.use(this.wall4);
        this.use(this.roof);
        this.use(this.light);
        this.use(this.doorFrame);
        for (let i = 0; i < 11; i++) {
            this.use(this.paintings[i]);
            this.use(this.paintingFrames[i]);
        }

        this.$world.addEventListener('click', this.click.bind(this));
    }

    click(){
        
        for(let value of this.paintings){
            let intersect = this.$world.controller.getRayCaster().intersectObject(value.getObject());
            if (intersect.length > 0) {
                let id=intersect[0].object.id;
                let first=this.paintings[0].getObject().id;

                id=(id-first)/4;
                framework.openRoom(this.data[id]);
                break;
            }
        }
    }

}

module.exports = RoomThree;
