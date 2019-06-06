const React = require("react");

const Anima = require('./Anima');

const signupStyles = require('./css/Signup.css');

class Signup extends React.Component {
    render () {
        return (
            <div className={this.props.className + ` ${signupStyles.back}`}>
                <Anima />
                <div className={signupStyles.right}>
                    <div className={signupStyles.form}>
                        <h1 className={signupStyles.title}>虚拟 3D 画展</h1>
                        <p className={signupStyles.desc}>注册</p>
                        <label htmlFor="username">用户名</label>
                        <input type="username" id="username" />
                        <label htmlFor="password">密码</label>
                        <input type="password" id="password" />
                        <label htmlFor="password-again">确认密码</label>
                        <input type="password-again" id="password" />
                        <div className={signupStyles.submit}>
                            <input type="submit" id="submit" value="注册" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Signup;