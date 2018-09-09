import React from 'react';
import ItemQty from './new-itemqty.jsx';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.i = 0;
        this.item = {
            id: this.i,
            size: "",
            qty: 0
        };
        this.state = {
            itemQtyList: [this.item] // na tej podstawie generowana lista z ItemQty
        }
    }

    // operacje na drzewie:
    addItemQty = (e) => { // metoda dodaje nowy ItemQty do listy
        e.preventDefault();
        this.i += 1;
        this.item = {
            id: this.i,
            size: "",
            qty: 0
        };
        let newItemQtyList = [...this.state.itemQtyList];
        newItemQtyList.push(this.item);
        this.setState({itemQtyList: newItemQtyList});
    };
    removeChild = (whichChild) => { // metoda usuwa konkretny ItemQty z listy
        let newItemQtyList = [...this.state.itemQtyList].filter(el => el.id !== whichChild);
        this.setState({itemQtyList: newItemQtyList});
    };
    removeItem = (e) => { // metoda informuje o konkretnym elemencie Item do usunięcia
        e.preventDefault();
        if (typeof this.props.removeMe === 'function') {
            this.props.removeMe(this.props.number)
        }
    };
    // wysyłka informacji do rodzica:
    sendItemValue = (e) => { // ta metoda informuje rodzica o wartości wpisanej w input Item (potrzebne do Logo)
        if (typeof this.props.itemValue === 'function') {
            this.props.itemValue(e.target.value, this.props.number);
        }
    };
    sendColor = (e) => { // ta metoda informuje rodzica o kolorze Item
        if (typeof this.props.itemColor === 'function') {
            this.props.itemColor(e.target.value, this.props.number);
        }
    };
    sendNotes = (e) => { // wysyła uwagi dodatkowe
        if (typeof this.props.itemNotes === 'function') {
            this.props.itemNotes(e.target.value, this.props.number);
        }
    };
    getSize = (childInfo, childId) => { //metoda uaktualnia rozmiarówkę w tablicy ze state
        let newSizes = [...this.state.itemQtyList];
        newSizes.forEach(el => {
            if (el.id === childId) {
                switch (typeof childInfo) {
                    case 'string':
                        el.size = childInfo;
                        break;
                    case 'number':
                        el.qty = childInfo;
                        break;
                }
            }
        });
        // wysyłka informacji dalej do rodzica (do NewOrder) w formie tablicy obiektów
        if (typeof this.props.itemQtyInfo === 'function') {
            this.props.itemQtyInfo(this.state.itemQtyList, this.props.number);
        }
    };

    render() {
        return <div className={"one-item"}>
            <label>
                <h2>Artykuł</h2>
                {this.props.number !== 0 &&
                <button onClick={this.removeItem} className={"remove-item"}>-</button>}
                <input type="text" name="item" onBlur={this.sendItemValue}/>
            </label>
            <div className={"item-qty"}>
                <label><span>Ilość</span>
                    <ul>{this.state.itemQtyList.map(el => <ItemQty getSize={this.getSize} removeMe={this.removeChild}
                                                                   key={el.id} number={el.id}/>)}</ul>
                    <button className={"add-qty"} onClick={this.addItemQty}>Dodaj rozmiar</button>
                </label>
            </div>
            <label>
                Kolor
                <input onBlur={this.sendColor} type="text"/>
            </label>
            <label>
                Uwagi dodatkowe
                <textarea onBlur={this.sendNotes} />
            </label>
        </div>
    }
}

export default Item;