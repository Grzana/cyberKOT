import React from 'react';

class MainSection extends React.Component {
    openNewOrder = () => {
        if (typeof this.props.whoIsVisible === 'function') {
            this.props.whoIsVisible("newOrder")
        }
    };
    openAdminPanel = () => {
        if (typeof this.props.whoIsVisible === 'function') {
            this.props.whoIsVisible("admin")
        }
    };
    openHistory = () => {
        if (typeof this.props.whoIsVisible === 'function') {
            this.props.whoIsVisible("history")
        }
    };
    render() {
        return <div className={"main"}>
            <div className={"header"}>
                <span>Witaj, {this.props.user}!</span>
                <div>Logo odpowiedniej firmy</div>
            </div>
            <div className={"options"}>
                <button onClick={this.openNewOrder} className={"tl"}>Otwórz nowe zlecenie (Dział handlowy)</button>
                <button onClick={this.openHistory} className={"tr"}>Historia zleceń</button>
                <button onClick={this.openAdminPanel} className={"bl"}>Konfiguracja (Admin)</button>
                <button className={"br"}>Realizacja zamówienia (Grafik)</button>
            </div>
        </div>
    }
}

export default MainSection;