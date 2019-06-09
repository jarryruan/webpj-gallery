const Component = require('#/system/Component');

const KeyCodes = {
    ENTER: 13,

};

class BarrageSender extends Component{
    onCreate(){
        super.onCreate();

        this.$world.addEventListener('keyup', this._onKeyUp.bind(this));
    }

    _onKeyUp(event) {
        const code = event.keyCode;

        if (code === KeyCodes.ENTER) {
            this.$ui.show({}, "speak");
            this.$parent.active = false;
            document.exitPointerLock();
        }
    }

}

module.exports = BarrageSender;