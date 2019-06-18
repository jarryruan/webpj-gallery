const React = require("react");

const config = require("#/config");
const loginStyles = require('./css/Login.css');

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            form: {
                username: "",
                password: ""
            },
            message: {}
        };

        this.rules = {
            username: (key) => {
                if (this.state.form.username === "") {
                    this.setState({
                        message: Object.assign(this.state.message, {
                            [key]: "用户名为空"
                        })
                    });
                    return false;
                }
                this.setState({
                    message: Object.assign(this.state.message, {
                        [key]: ""
                    })
                });
                return true;
            },
            password: (key) => {
                if (this.state.form.password === "") {
                    this.setState({
                        message: Object.assign(this.state.message, {
                            [key]: "密码为空"
                        })
                    });
                    return false;
                }
                this.setState({
                    message: Object.assign(this.state.message, {
                        [key]: ""
                    })
                });
                return true;
            }
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.linkToSignUp = this.linkToSignUp.bind(this);
        this.checkSession();
    }

    checkSession() {
        config.axiosInstance.get("/api/users/self")
            .then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        window.message.success("登录成功");
                        this.props.UIHide();
                    }
                } else window.message.error(resp.status)
            })
    }

    handleLogin() {
        let pass = Object.keys(this.rules).every((key) => (this.rules[key](key)));
        if (pass) {
            config.axiosInstance.post(
                "/api/users/self", {
                    username: this.state.form.username,
                    password: this.state.form.password
                }
            ).then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        window.message.success(response.message);
                        this.props.UIHide();
                    } else {
                        window.message.error(response.message);
                    }
                } else window.message.error(resp.status);
            });
        }
    }

    linkToSignUp() {
        this.props.UIShow({}, 'signup');
    }

    onChange(key, event) {
        this.setState({
            form: Object.assign({}, this.state.form, {
                [key]: event.target.value
            })
        });
    }

    render () {
        return (
            <div className={this.props.className + ` ${loginStyles.back}`}>
                <div className={loginStyles.page}>
                    <div className={loginStyles.container}>
                        <div className={loginStyles.left}>
                            <div className={loginStyles.login}>登录</div>
                            <div className={loginStyles.eula}>您无需阅读用户条款即可登录虚拟 3D 画展
                            </div>
                            <span className={loginStyles.signup} onClick={this.linkToSignUp}>注册</span>
                        </div>
                        <div className={loginStyles.right}>
                            <div className={loginStyles.form}>
                                <label htmlFor="username">用户名</label>
                                <input type="username" id="username" onChange={this.onChange.bind(this, 'username')} />
                                {this.state.message["username"] && this.state.message["username"] !== "" ? 
                                    <p style={{color: 'red', fontSize: '14px'}}>{this.state.message["username"]}</p>: null}
                                <label htmlFor="password">密码</label>
                                <input type="password" id="password" onChange={this.onChange.bind(this, 'password')} />
                                {this.state.message["password"] && this.state.message["password"] !== ""  ? 
                                    <p style={{color: 'red', fontSize: '14px'}}>{this.state.message["password"]}</p>: null}
                                <div className={loginStyles.submit}>
                                    <input type="submit" id="submit" value="登录" onClick={this.handleLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Login;