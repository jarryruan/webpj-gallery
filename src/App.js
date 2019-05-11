const Application = require('system/Application');

class App extends Application{
    constructor(root){
        super(root);
    }

    onCreate(){

    }

    findObject(name){
        return this.getObject().getObjectByName(name);
    }
}


module.exports = App;