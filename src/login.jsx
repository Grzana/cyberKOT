import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            psw: true
        }
    }
    validate = (e) => {
        e.preventDefault();
        if (typeof this.props.whoIsVisible === 'function' && this.state.login && this.state.psw) {
            this.props.whoIsVisible("main")
        }
    };
    render() {
        let login = <div className={"cat-border login center"}>
                <div className={"arrow"} id={"left-arrow"} />
                <div className={"arrow"} id={"right-arrow"}/>
                <form className={"center"}>
                    <span>Zaloguj się</span>
                    <div className={"login-form center"}>
                        <input style={{margin: "0 auto"}} type="text" placeholder="Login"/>
                        <input type="password" placeholder="Hasło"/>
                        <button onClick={this.validate}>OK</button>
                    </div>
                </form>
            </div>;
        return login
    }
}

export default Login;