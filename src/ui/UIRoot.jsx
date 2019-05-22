const React = require('react');

const styles = require('./css/UIRoot.css');

class UIRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };

        if(!UIRoot.instance)
            UIRoot.instance = this;
    }

    render(){
        let classes = [styles.root];
        if(!this.state.visible)
            classes.push(styles.hidden);
        classes = classes.join(" ");

        return (
            <div className={classes}>
                Hello World!
            </div>
        );
    }

    show(){
        this.setState({visible: true});
    }

    hide(){
        this.setState({visible: false});
    }
}

 module.exports = UIRoot;