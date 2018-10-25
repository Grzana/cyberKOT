import React from 'react';
import firebase, {db}  from './firebase_config.jsx';

class History extends React.Component {

    getOrders = () => { // query all documents from "Orders" collection
        let arr = [];
        return db.collection("Orders").get().then((querySnapshot) => {
            querySnapshot.forEach(doc => arr.push(doc.data()));
            return arr;
        });
    };

    printTable = () => {
        
        let res = this.getOrders().then((orders) => {
            let rows = [];
            for (let i = 0; i < orders.length; i++) {
                let columns = [];
                let tags=['id', 'date', 'customer', 'user', 'status'];
                for (let j = 0; j < tags.length; j++) {
                    let tag = tags[j];
                    columns.push(orders[i][tag]);
                };
                
                rows.push(columns); // outcome: rows: array with orders 
                                    // where elements are arrays (named 'columns') with 5 elements -> check tags array
            };
            console.log('rows: ', rows);
            //this.setState({dataCaught: true});
            //return rows.map((el, i) => <tr key={i}>{el.map((data, j) => <td key={j}>{data[0]}</td>)}</tr>);
            return rows
        });
        return res;
        //this.getOrders().then(result => console.log('result: ', result));
    };

    test = () => {
        let rows = this.printTable();
        console.log('test: ', rows);
        return rows.map((el, i) => <tr key={i}><td>{el}</td></tr>);
    };

    render() {
        
        return <div>
            <div>
                <h1>Historia zleceń</h1>
            </div>

            <table>
                <tbody>
                    {this.test()}
                </tbody>
            </table>

            <div>
                <button>Cofnij</button>
            </div>
        </div>
    }
}

export default History;