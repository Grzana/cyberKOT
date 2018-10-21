import React from 'react';
import firebase, {db}  from './firebase_config.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLogin: "",
            inputPsw: "",
            login: false,
            psw: false,
            loginInfo: "hidden",
            pswInfo: "hidden"
        }
    }
    getLogin = (e) => { // przekazuje login z inputa do state
        this.setState({inputLogin: e.target.value})
    };
    getPsw = (e) => { // przekazuje hasło z inputa do state
        this.setState({inputPsw: e.target.value})
    };
    validate = (e) => { // sprawdzenie czy login istnieje i hasło jest poprawne - jeśli tak, wpuszcza do programu, login przekazany do rodzica
        e.preventDefault();
        let userRef = db.collection("Users").doc("VEDA5"); // sprawdzenie poprawności loginu i hasła
        userRef.get().then((doc) => {
            if (doc.exists) {
                let users = doc.data();
                for (let el in users) {
                    if (users[el].login === this.state.inputLogin) {
                        this.setState({login: true});
                        if (users[el].password === this.state.inputPsw) {
                            this.setState({psw: true});
                        } else {
                            this.setState({pswInfo: "visible"});
                        }
                    } else {
                        this.setState({loginInfo: "visible", pswInfo: "visible"});
                    }
                }
                if (typeof this.props.whoIsVisible === 'function' && typeof this.props.sendLogin === 'function') {
                    if (this.state.login && this.state.psw) {
                        this.props.sendLogin(this.state.inputLogin);
                        this.props.whoIsVisible("main");
        }
        else {
            console.log("Login NOK");
        }
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };
    render() {
        let loginNOK, pswNOK;
        if (this.state.login === false) {
            loginNOK = <div className={this.state.loginInfo} id="loginNOK">Błędny login</div>
        } else {
            loginNOK = null;
        }
        if (this.state.psw === false) {
            pswNOK = <div className={this.state.pswInfo} id="pswNOK">Błędne hasło</div>
        } else {
            pswNOK = null;
        }
        let login = <div className={"cat-border login center"}>
                <div className={"arrow"} id={"left-arrow"} />
                <div className={"arrow"} id={"right-arrow"}/>
                <form className={"center"}>
                    <span>Zaloguj się</span>
                    <div className={"login-form center"}>
                        <input onChange={this.getLogin} style={{margin: "0 auto"}} type="text" placeholder="Login"/>
                        {loginNOK}
                        <input onChange={this.getPsw} type="password" placeholder="Hasło"/>
                        {pswNOK}
                        <button onClick={this.validate}>OK</button>
                    </div>
                </form>
            </div>;
        return login
    }
}

export default Login;