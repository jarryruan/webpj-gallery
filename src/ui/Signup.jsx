const React = require("react");

const Anima = require('./Anima');
const config = require("#/config");
const signupStyles = require('./css/Signup.css');

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: "",
                password: "",
                passwordAgain: ""
            },
            message: {},
        };
        this.rules = {
            username: (key) => {
                if (this.state.form.username === undefined || this.state.form.username === "") {
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
                if (this.state.form.password === undefined || this.state.form.password === "") {
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
            },
            passwordAgain: (key) => {
                if (this.state.form.passwordAgain === "" || this.state.form.password !== this.state.form.passwordAgain) {
                    this.setState({
                        message: Object.assign(this.state.message, {
                            [key]: "两次密码不一致"
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

        this.handleSignUp = this.handleSignUp.bind(this);
        this.linkToLogin = this.linkToLogin.bind(this);
    }

    handleSignUp() {
        // 多次连续 setState() 只会调用最后一次的 setState()
        let pass = Object.keys(this.rules).every((key) => (this.rules[key](key)));
        if (pass) {
            
            config.axiosInstance.post(
                "/api/users", {
                    username: this.state.form.username,
                    password: this.state.form.password
                }
            ).then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        window.message.success(response.message);
                        this.props.UIShow({}, 'login');
                    } else {
                        window.message.error(response.message);
                    }
                } else {
                    window.message.error(resp.status);
                }
            });
        }
    }

    linkToLogin() {
        this.props.UIShow({}, 'login');
    }

    onChange(key, event){
        this.setState({
            form: Object.assign({}, this.state.form, {
                [key]: event.target.value
            })
        });
    }

    render () {
        return (
            <div className={this.props.className + ` ${signupStyles.back}`}>

                <Anima />
                <div className={signupStyles.right}>
                    <div className={signupStyles.form}>
                        <h1 className={signupStyles.title}>虚拟 3D 画展</h1>
                        <p className={signupStyles.desc}><span className={signupStyles.login} onClick={this.linkToLogin}>登录</span></p>
                        <label htmlFor="username">用户名</label>
                        <input type="username" id="username" onChange={this.onChange.bind(this, "username")} />
                        {this.state.message["username"] && this.state.message["username"] !== "" ? 
                            <p style={{color: 'red', fontSize: '14px'}}>{this.state.message["username"]}</p>: null}
                        <label htmlFor="password">密码</label>
                        <input type="password" id="password" onChange={this.onChange.bind(this, "password")} />
                        {this.state.message["password"] && this.state.message["password"] !== ""  ? 
                            <p style={{color: 'red', fontSize: '14px'}}>{this.state.message["password"]}</p>: null}
                        <label htmlFor="passwordAgain">确认密码</label>
                        <input type="password" id="passwordAgain" onChange={this.onChange.bind(this, "passwordAgain")} />
                        {this.state.message["passwordAgain"] && this.state.message["passwordAgain"] !== "" ? 
                            <p style={{color: 'red', fontSize: '14px'}}>{this.state.message["passwordAgain"]}</p>: null}
                        <div className={signupStyles.submit}>
                            <input type="submit" id="submit" value="注册" onClick={this.handleSignUp} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Signup;