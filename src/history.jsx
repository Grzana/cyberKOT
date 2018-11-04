import React from 'react';
import firebase, { db } from './firebase_config.jsx';

class Loading extends React.Component {
    render() {
        return <div>
            Dane są ładowane...
        </div>
    }
}

class More extends React.Component {

    printTable = (order) => {
        return <div>
            <button>Zamknij</button>
            <h1>Zamówienie {order.id}</h1>
            <h2>Data: {order.date}</h2>
            <h2>Klient: {order.customer}</h2>
            <h2>Pracownik: {order.user}</h2>
            <h2>Status: {order.status}</h2>
        </div>
    };

    render() {
        return this.printTable(this.props.order);
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showData: {},
        }
    }

    cancel = (e) => { // cancels the order, moves to another collection, permission only for admin and user who created the order
        let tr = e.target.parentElement.parentElement; // tr containing 'Cancel' button
        let user = this.props.user; // currently logged user
        let userTab = tr.children[3].innerHTML; // user from clicked order
        let idTab = tr.children[0].innerHTML; // id of clicked order
        let statusTab = tr.children[4].innerHTML; // status of clicked order
        let name = "Zamówienie " + idTab; // this order name 
        if (user === userTab || user === "Admin") {
            let ref = db.collection("Orders").doc(name);
            ref.set({status: "ANULOWANO"}, { merge: true }); // change order data
            statusTab = "ANULOWANO"; // change displaying status
            tr.classList.add('lineThrough'); // the line will be crossed out
        } else {
            alert("Brak uprawnień"); // TODO: Dodać diva z komunikatem
        }
    };

    more = (e) => { // displays full data of the order
        let tr = e.target.parentElement.parentElement; // tr containing 'Show More' button
        let idTab = tr.children[0].innerHTML; // id of clicked order
        let name = "Zamówienie " + idTab; // this order name 
        let ref = db.collection("Orders").doc(name);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({show: true, showData: doc.data()}); // TODO: pokazać okienko z danym zamówieniem
            } else {
                console.log("No such document!");
            }}).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }; 

    printTable = (orders) => {

        let rows = [];
        for (let i = 0; i < orders.length; i++) {
            let columns = [];
            let tags = ['id', 'date', 'customer', 'user', 'status']; // these are column names (and object keys)
            for (let j = 0; j < tags.length; j++) {
                let tag = tags[j]; // iterate through tags array 
                columns.push(orders[i][tag]);
            };

            rows.push(columns); // outcome: rows: array with orders 
            // where elements are arrays (named 'columns') with 5 elements -> check tags array
        };
        return rows;
    };

    render() {
        let more = null
        if (this.state.show) {
            more = <More order={this.state.showData}/> // More Component will be shown when the button '+' is clicked
        }
        return <div>
        <table>
            <thead>
                <tr>
                    <td>NR</td>
                    <td>DATA</td>
                    <td>KLIENT</td>
                    <td>PRACOWNIK</td>
                    <td>STATUS ZLECENIA</td>
                </tr>
            </thead>
            <tbody>
                {this.printTable(this.props.data).map((el, i) => {
                    return <tr key={i}>{el.map((elEl, j) => <td key={j}>{
                        elEl}</td>)}<td>
                            <button onClick={this.cancel}>X</button>
                            <button onClick={this.more}>+</button></td></tr>
                }
                )}
            </tbody>
        </table>
        <div>{more}</div>
        </div>
    }
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caught: false,
            data: []
        }
    }

    getOrders = () => { // query all documents from "Orders" collection
        let arr = [];
        if (this.state.caught) { return null } else {
            return db.collection("Orders").get().then((querySnapshot) => {
                querySnapshot.forEach(doc => arr.push(doc.data()));
                this.setState({ caught: true, data: arr });
                return arr;
            })
        };
    };

    render() {
        this.getOrders();
        let info;
        if (!this.state.caught) {
            this.info = <Loading />
        } else {
            this.info = <Table data={this.state.data} user={this.props.user} />
        };
        return <div>
            <div>
                <h1>Historia zleceń</h1>
            </div>
            {this.info}
            <div>
                <button>Cofnij</button>
            </div>
        </div>
    }
}

export default History;