import React from 'react';

class ItemQty extends React.Component {

    removeItemQty = () => { // metoda informuje o konkretnym elemencie ItemQty do usunięcia
        if (typeof this.props.removeMe === 'function') {
            this.props.removeMe(this.props.number)
        }
    };
    updateSize = (e) => {
        if (typeof this.props.getSize === 'function') {
            this.props.getSize(e.target.value, this.props.number)
        }
    };
    updateQty = (e) => {
        if (typeof this.props.getSize === 'function') {
            this.props.getSize(parseInt(e.target.value), this.props.number)
        }
    };
    render() {
        return <li key={this.props.number} className={"sizeOption"}>
            <select onChange={this.updateSize}>
                <option>Wybierz rozmiar</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
            </select>
            <input onChange={this.updateQty} type="text"/><span>szt.</span>
            {this.props.number !== 0 && <button onClick={this.removeItemQty} className={"remove-qty"}>-</button>}
        </li>
    }
}

export default ItemQty;