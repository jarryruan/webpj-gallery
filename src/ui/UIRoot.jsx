const React = require('react');

const styles = require('./css/UIRoot.css');

class UIRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            text: ''
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
                {this.state.text}
            </div>
        );
    }

    show(text){
        this.setState({
            visible: true,
            text
        });

    }

    hide(){
        this.setState({visible: false});
    }
}

 module.exports = UIRoot;