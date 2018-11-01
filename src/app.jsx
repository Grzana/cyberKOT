import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/sass/noewstyle.scss';
import Login from './login.jsx';
import MainSection from './main_section.jsx';
import NewOrder from './new.jsx';
import AdminPanel from './admin_panel.jsx';
import History from './history.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "Admin",     // aktualnie zalogowany user
            show: "history" // które okno pokazuje po odpaleniu apki
        }
    }
    getInfo = (childInfo) => {
        this.setState({show: childInfo})  // które okno pokazać
    };
    getUser = (loggedUser) => {
        this.setState({user: loggedUser}) // który user jest zalogowany
    };
    render() {
        let show = null;
        switch (this.state.show) {
            case "login":
                show = <Login whoIsVisible={this.getInfo} sendLogin={this.getUser} />;
                break;
            case "main":
                show = <MainSection whoIsVisible={this.getInfo} user={this.state.user} />;
                break;
            case "newOrder":
                show = <NewOrder whoIsVisible={this.getInfo} user={this.state.user} className={"new-order-component"} />
                break;
            case "history":
                show = <History whoIsVisible={this.getInfo} user={this.state.user} />
                break;
            case "admin":
                if (this.state.user === "Admin") {
                    show = <AdminPanel whoIsVisible={this.getInfo}/>
                }
                else {
                    console.log("Brak uprawnień do panelu");
                    show = <MainSection whoIsVisible={this.getInfo} user={this.state.user} />;
                }
        }
        return <div className={"center"}>
            {show}
        </div>
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});