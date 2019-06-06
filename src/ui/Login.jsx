const React = require("react");

const loginStyles = require('./css/Login.css');

class Login extends React.Component {

    constructor (props) {
         super(props);
         this.state = {
             form: {
                 username: "",
                 password: ""
             }
         };

        this.handleLogin = this.handleLogin.bind(this);

    }

    handleLogin() {

    }

    onChange(key, event) {
        this.setState({
            form: {
                [key]: event.target.value
            }
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
                            <span className={loginStyles.signup}>注册</span>
                        </div>
                        <div className={loginStyles.right}>
                            <div className={loginStyles.form}>
                                <label htmlFor="username">用户名</label>
                                <input type="username" id="username" />
                                <label htmlFor="password">密码</label>
                                <input type="password" id="password" />
                                <div className={loginStyles.submit}>
                                    <input type="submit" id="submit" value="登录" />
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