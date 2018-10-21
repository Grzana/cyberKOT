import React from 'react';
import firebase, { db } from './firebase_config.jsx';

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

                for (let j = 0; j < 1; j++) {
                    columns.push(orders[i].id);
                };
                
                rows.push(columns);
            };
            console.log(rows);
            //let rows2 = [ [1], [2] ];
            //return rows2.map((el, i) => <tr key={i}>{el.map((data, j) => <td key={j}>{data[0]}</td>)}</tr>);
            return rows;
        });
        return res;
        //this.getOrders().then(result => console.log('result: ', result));
    };

    dupa = () => {
        let dupsko = this.printTable();
        console.log('dupa: ', dupsko);
    };

    render() {

        return <div>
            <div>
                <h1>Historia zleceń</h1>
            </div>

            <table>
                <tbody>
                    {this.dupa()}
                </tbody>
            </table>

            <div>
                <button>Cofnij</button>
            </div>
        </div>
    }
}

export default History;