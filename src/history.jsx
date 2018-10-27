import React from 'react';
import firebase, { db } from './firebase_config.jsx';

class Loading extends React.Component {
    render() {
        return <div>
            Dane są ładowane...
        </div>
    }
}

class Table extends React.Component {

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
        return rows
    };

    render() {
        return <table>
            <tbody>
                {this.printTable(this.props.data).map((el, i) => {
                    return <tr key={i}>{el.map((elEl, j) => <td key={j}>{elEl}</td>)}</tr>
                }
                )}
            </tbody>
        </table>
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
            this.info = <Table data={this.state.data} />
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