const React = require('react');
require('./message');
const config = require('#/config');
const styles = require('./css/UIRoot.css');

const Login = require('./Login');
const Signup = require('./Signup');

const PartType = {
    PERSON_INFO: "user",
    SPEAK: "speak",
    W_COMMENT: "write",
    R_COMMENT: "read",
    LOGIN: 'login',
    SIGN_UP: 'signup'
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
        this.handleLogout = this.handleLogout.bind(this);
        this.handleBack = this.handleBack.bind(this);

        let ui = document.querySelector("#ui");
        ui.addEventListener('keydown', (e) => {
            if (e.keyCode === KeyCodes.ENTER) {
                if (e.target.id === "barrageInput")
                    e.preventDefault();
            }
        });
        ui.addEventListener('keyup', (e) => {
            if (e.keyCode === KeyCodes.ENTER) {
                // 保证只有 input 输入才调用 handleSpeak()
                if (e.target.id === "barrageInput")
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
        } else if (partId === PartType.LOGIN || partId === PartType.SIGN_UP || partId === PartType.AIMER) {
            this.setState({
                visible: true,
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

        this.refs.BTComment.disabled = true;
        if (this.state.comment !== "") {

            let commentOptions = {
                content: this.state.comment,
                transform: {
                    position: this.state.userInfo.position,
                    rotation: this.state.userInfo.rotation
                }
            };

            config.axiosInstance.post(`/api/paintings/${this.state.userInfo.paintingId}/comments`, commentOptions).then((resp) => {

                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        commentOptions.username = this.state.userInfo.username;
                        this.$framework.getWorld().addComment(commentOptions);
                        window.message.success(response.message);
                        this.hide();
                        this.refs.BTComment.disabled = false;
                    } else window.message.error(response.message);
                } else window.message.error(resp.status)
            });
        } else {
            window.message.error("评论为空");
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
            
            window.message.error("发送弹幕失败，没有信息");
        }
    }

    handleBack(e) {
        e.preventDefault();

        
        window.framework.view("hall");
        
        this.$framework.getWorld().controller.lock();
        this.$framework._dom.focus();
    }

    handleLogout(e) {
        e.preventDefault();

        config.axiosInstance.get("/api/users/logout")
            .then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        window.message.success(response.message);
                        this.show({}, 'login');

                    } else window.message.error(response.message);
                } else window.message.error(resp.status);
            });
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value
        });
    }

    linkTo(page) {
        this.show({}, page);
    }

    render(){
        let classes = [styles.root];
        if(!this.state.visible)
            classes.push(styles.hidden);
        classes = classes.join(" ");

        if (this.state.partId === PartType.PERSON_INFO) {
            return (
                <div className={classes + ` ${styles['no-bottom']}`}>
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical}`}>
                        <h1>Nickname: {this.state.userInfo.username}</h1>
                        <div className={`${styles.data}  ${styles.white}`}>
                            <div className={`${styles.flex} ${styles['center']}`}>
                                <ul className={styles.transform}>Position:
                                    <li>x: {this.state.userInfo.position.x}</li>
                                    <li>y: {this.state.userInfo.position.y}</li>
                                    <li>z: {this.state.userInfo.position.z}</li>
                                </ul>
                                <ul className={styles.transform}>Direction:
                                    <li>x: {this.state.userInfo.rotation.x}</li>
                                    <li>y: {this.state.userInfo.rotation.y}</li>
                                    <li>z: {this.state.userInfo.rotation.z}</li>
                                </ul>
                            </div>

                            {/*<p className={styles.room}>房间名: {this.state.userInfo.name}</p>*/}

                            <div className={`${styles.flex} ${styles.vertical} ${styles.center}`}>
                                {this.state.userInfo.paintingId >= 0 ?
                                    <input type="submit" className={styles.back} value="返回主世界" onClick={this.handleBack} /> : null}
                                <input type="submit" className={styles.login} value="登出" onClick={this.handleLogout} />
                                <input type="submit" className={styles.signup} value="注册" onClick={this.linkTo.bind(this, 'signup')} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.SPEAK) {
            return (
                <div className={classes + ` ${styles['no-top']}`}>
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
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
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
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
                                    <button ref="BTComment" className={styles['bt-primary']} onClick={this.handleWriteComment}>提交</button>
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
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
                    <div className={`${styles.content} ${styles.autofill} ${styles.flex} ${styles.vertical}`}>
                        <h1>评论 -- 来自 {this.state.commentInfo.username}</h1>
                        <div>
                            <p className={`${styles.white} ${styles.comment}`}>{this.state.commentInfo.text}</p>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.partId === PartType.LOGIN) {
            return (
                <div>
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
                    <Login className={classes + ` ${styles['fill-width']}`}
                           UIShow={this.show.bind(this)}
                           UIHide={this.hide.bind(this)}
                    />
                </div>

            );
        }
        else if (this.state.partId === PartType.SIGN_UP) {
            return (
                <div>
                    <window.message.ButterToast
                        position={{vertical: window.message.POS_TOP, horizontal: window.message.POS_CENTER}}
                        timeout={3000}
                        className={require('./css/ButterToast.css').shadow}
                    />
                    <Signup className={classes + ` ${styles['fill-width']}`} UIShow={this.show.bind(this)}
                    />
                </div>);

        }else {
            return (<div className={classes}>partId error</div>);
        }
    }
}




module.exports = UIRoot;
// export default UIRoot;