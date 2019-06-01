const Component = require('#/system/Component');
const THREE = window.THREE;

class PlayerGroup extends Component{
    onCreate(){
        console.log(this.$client);
    }
}


module.exports = PlayerGroup;