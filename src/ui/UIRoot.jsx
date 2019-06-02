const React = require('react');
const axios = require('axios');

const styles = require('./css/UIRoot.css');

const PartType = {
    PERSON_INFO: "user",
    SPEAK: "speak",
    W_COMMENT: "write",
    R_COMMENT: "read",
};

const KeyCodes = {
    ENTER: 13,
};

class UIRoot extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            userInfo: {},
            commentInfo: {},
            partId: "read",

            comment: "",
            barrage: ""
        };

        if(!UIRoot.instance)
            UIRoot.instance = this;

        this.handleWriteComment = this.handleWriteComment.bind(this);
        this.handleSpeak = this.handleSpeak.bind(this);

        let ui = document.querySelector("#ui");
        ui.addEventListener('keydown', (e) => {
            if (e.keyCode === KeyCodes.ENTER) {
                if (e.target.id == "barrageInput")
                    e.preventDefault();
            }
        });
        ui.addEventListener('keyup', (e) => {
            if (e.keyCode === KeyCodes.ENTER) {
                // 保证只有 input 输入才调用 handleSpeak()
                if (e.target.id == "barrageInput")
                    this.handleSpeak(e)
            }
        });
    }

    show(info, partId){
        if (partId === PartType.R_COMMENT) {
            this.setState({
                visible: true,
                commentInfo: info,
                partId
            });
        } else if (partId === PartType.W_COMMENT) {
            this.setState({
                visible: true,
                userInfo: info,
                comment: "",
                partId
            });
            // textarea 聚焦
            this.refs.IComment.focus();
        } else if (partId === PartType.SPEAK) {
            this.setState({
                visible: true,
                barrage: "",
                partId
            });
            // input 聚焦
            this.refs.IBarrage.focus();
        } else if (partId === PartType.PERSON_INFO) {
            this.setState({
                visible: true,
                userInfo: info,
                partId
            });
        } else {
            // do nothing
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

    handleSpeak(e) {
        e.preventDefault();

        if (this.state.barrage !== "") {

            window.framework.sendBarrage(this.state.barrage);
            this.hide();
            this.$framework.getWorld().controller.lock();
            this.refs.IBarrage.blur();
            this.$framework._dom.focus();

        } else {
            alert("发送弹幕失败，没有信息");
        }
    }

    onChange(key, event) {

        this.setState({
            [key]: event.target.value
        });

    }

    render(){
        let classes = [styles.root];
        if(!this.state.visible)
            classes.push(styles.hidden);
        classes = classes.join(" ");

        if (this.state.partId === PartType.PERSON_INFO) {
            return (
                <div className={classes + ` ${styles['no-bottom']}`}>
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical}`}>
                        <h1>Nickname: {this.state.userInfo.username}</h1>
                        <div className={styles.white}>
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
                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.SPEAK) {
            return (
                <div className={classes + ` ${styles['no-top']}`}>
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical} ${styles.end}`}>
                        <h1>操作界面</h1>
                        <div>
                            <form ref="form">
                                <div>
                                    <p className={styles.white}>弹幕在这里：</p>
                                </div>
                                <div>
                                    <input ref="IBarrage" id="barrageInput" type="text" value={this.state.barrage} onChange={this.onChange.bind(this, "barrage")} />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.W_COMMENT) {
            return (
                <div className={classes + ` ${styles['no-top']}`}>
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical} ${styles.end}`}>

                        <h1>操作界面</h1>
                        <div>
                            <h2>你好，{this.state.userInfo.username}</h2>
                            <form ref="form">
                                <div>
                                    <p className={styles.white}>分享你的评论</p>
                                </div>
                                <div>
                                    <textarea ref="IComment" value={this.state.comment} onChange={this.onChange.bind(this, "comment")} />
                                </div>
                                <div>
                                    <button className={styles['bt-primary']} onClick={this.handleWriteComment}>提交</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.R_COMMENT) {
            return (
                <div className={classes + ` ${styles['no-bottom']}`}>
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical}`}>
                        <h1>评论 -- 来自 {this.state.commentInfo.username}</h1>
                        <div>
                            <p className={`${styles.white} ${styles.comment}`}>{this.state.commentInfo.text}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

module.exports = UIRoot;
// export default UIRoot;