import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/sass/noewstyle.scss';
import Login from './login.jsx';
import MainSection from './main_section.jsx';
import NewOrder from './new.jsx';
import AdminPanel from './admin_panel.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activateMain: false,
            show: "login"
        }
    }
    getInfo = (childInfo) => {
      this.setState({show: childInfo})  // które okno pokazać
    };
    render() {
        let show = null;
        switch (this.state.show) {
            case "login":
                show = <Login whoIsVisible={this.getInfo} />;
                break;
            case "main":
                show = <MainSection whoIsVisible={this.getInfo}/>;
                break;
            case "newOrder":
                show = <NewOrder whoIsVisible={this.getInfo} className={"new-order-component"} />
                break;
            case "admin":
                show = <AdminPanel whoIsVisible={this.getInfo}/>
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