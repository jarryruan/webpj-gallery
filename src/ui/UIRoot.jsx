const React = require('react');
const axios = require('axios');

const styles = require('./css/UIRoot.css');

const PartType = {
    PERSON_INFO: "user",
    W_COMMENT: "write",
    R_COMMENT: "read",
};

class UIRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            text: '',
            userInfo: {},
            partId: "read",

            comment: "",

        };

        if(!UIRoot.instance)
            UIRoot.instance = this;

        this.handleWriteComment = this.handleWriteComment.bind(this);

    }

    show(info, partId){
        if (partId === PartType.R_COMMENT) {
            this.setState({
                visible: true,
                text: info,
                partId
            });
        } else if (partId === PartType.W_COMMENT || partId === PartType.PERSON_INFO) {
            this.setState({
                visible: true,
                userInfo: info,
                partId
            })
        }

    }

    hide(){
        this.setState({visible: false});
    }

    handleWriteComment(e) {
        e.preventDefault();

        if (this.state.comment !== "") {
            // TODO
            // axios.post('/api/paintings/' + this.state.userInfo.roomId + '/comments');

            alert("评论成功: " + this.state.comment);
        } else {
            alert("评论失败");
        }

    }

    onChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    render(){
        let classes = [styles.root];
        if(!this.state.visible)
            classes.push(styles.hidden);
        classes = classes.join(" ");

        if (this.state.partId === PartType.PERSON_INFO) {
            return (
                <div className={classes}>
                    <h1>Nickname: {this.state.userInfo.username}</h1>
                    <ul>Position:
                        <li>x: {this.state.userInfo.position.x}</li>
                        <li>y: {this.state.userInfo.position.y}</li>
                        <li>z: {this.state.userInfo.position.z}</li>
                    </ul>
                    <ul>Direction:
                        <li>x: {this.state.userInfo.rotation.x}</li>
                        <li>y: {this.state.userInfo.rotation.y}</li>
                        <li>z: {this.state.userInfo.rotation.z}</li>
                    </ul>
                    <p>Room ID: {this.state.userInfo.roomId}</p>
                </div>
            );
        }
        else if (this.state.partId === PartType.W_COMMENT) {
            return (
                <div className={classes}>
                    <div className={`${styles.autofill} ${styles.flex} ${styles.vertical} ${styles['space-between']}`}>
                        <div className={styles.white}>
                            <h1>Nickname: {this.state.userInfo.username}</h1>
                            <ul>Position:
                                <li>x: {this.state.userInfo.position.x}</li>
                                <li>y: {this.state.userInfo.position.y}</li>
                                <li>z: {this.state.userInfo.position.z}</li>
                            </ul>
                            <ul>Direction:
                                <li>x: {this.state.userInfo.rotation.x}</li>
                                <li>y: {this.state.userInfo.rotation.y}</li>
                                <li>z: {this.state.userInfo.rotation.z}</li>
                            </ul>
                            <p>Room ID: {this.state.userInfo.roomId}</p>
                        </div>
                        <form ref="form">
                            <div>
                                <textarea value={this.state.comment} onChange={this.onChange.bind(this)} />
                            </div>
                            <div>
                                <button className={styles['bt-primary']} onClick={this.handleWriteComment}>提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.R_COMMENT) {
            return (
                <div className={classes}>
                    <div className={`${styles.autofill} ${styles.flex} ${styles.center}`}>
                        <p className={styles.white}>{this.state.text}</p>
                    </div>
                </div>
            );
        }
    }
}

module.exports = UIRoot;
// export default UIRoot;