import React from 'react';
import Item from './new-item.jsx';
import Logo from './logo.jsx'
import OrderSummary from "./order_summary.jsx";
import firebase, {db}  from './firebase_config.jsx';

class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.i = 0;
        this.j = 0;
        this.item = {
            id: this.i,
            value: "",   // item przekazuje swoją nazwę
            color: "",   // item przekazuje swoj kolor
            notes: "",   // item przekazuje swoj opis
            qtyInfo: []  // item przekazuje rozmiarówkę i ilości
        };
        this.logo = {
            id: this.j,
            name: "",
            qty: [], // tablica z ItemId, które mają to logo!!! (na tej podstawie wyliczana jest ilość)
            price: 0,
            method: "",
            colors: 0,
            complexity: 2,
            height: 0,
            width: 0,
            area: 0
        };
        this.state = {
            itemList: [this.item], // na tej podstawie generowana lista z Item oraz lista z Item names (do generowania logo checkbox)
            logoList: [this.logo], // na tej podstawie generowana lista z Logo
            customer: "",
            order: null,             // w chwili submit form pushuje się kompletne, zwlaidowane zamówienie
            validationOk: true,    // jeśli formularz jest dobrze wypełniony TODO walidacja
            showSummary: false,     // jeśli true - chowa formularz i pokazuje podsumowanie
            priceInfo: {}
        };
    }
    // dodawanie i usuwanie dzieci
    addItem = (e) => { // metoda dodaje nowy Item do listy
        e.preventDefault();
        this.i += 1;
        this.item = {
            id: this.i,
            value: "",
            color: "",
            notes: "",
            qtyInfo: []
        };
        let newItemList = [...this.state.itemList];
        newItemList.push(this.item);
        this.setState({itemList: newItemList});
    };
    addLogo = (e) => { // metoda dodaje nowe Logo do listy
        e.preventDefault();
        this.j += 1;
        this.logo = {
            id: this.j,
            name: "",
            qty: [],
            price: 0,
            method: "",
            colors: 0,
            complexity: 2,
            height: 0,
            width: 0,
            area: 0
        };
        let newLogoList = [...this.state.logoList];
        newLogoList.push(this.logo);
        this.setState({logoList: newLogoList});
    };
    removeChild = (whichChild) => { // metoda usuwa konkretny Item z listy
        let newItemList = [...this.state.itemList].filter(el => el.id !== whichChild);
        this.setState({itemList: newItemList});
    };
    removeLogo = (whichLogo) => {
        let newLogoList = [...this.state.logoList].filter(el => el.id !== whichLogo);
        this.setState({logoList: newLogoList});
    };
    getCustomer = (e) => {
        this.setState({customer: e.target.value})
    };
    // odbieranie info od Item
    getItemValue = (inputValue, inputId) => { // ta metoda tworzy listę wszystkich itemów (po nazwach) i przekazuje do state, gdzie ze state odbiera to logo

        let newItemList = [...this.state.itemList];
        for (let k = 0; k < newItemList.length; k++) {
            if (newItemList[k].id === inputId) {
                newItemList[k].value = inputValue
            }
        }
        this.setState({itemList: newItemList});

    };
    getItemColor = (inputColor, inputId) => {
        let newItemList = [...this.state.itemList];
        for (let k = 0; k < newItemList.length; k++) {
            if (newItemList[k].id === inputId) {
                newItemList[k].color = inputColor
            }
        }
        this.setState({itemList: newItemList});
    };
    getItemNotes = (inputNotes, inputId) => {
        let newItemList = [...this.state.itemList];
        for (let k = 0; k < newItemList.length; k++) {
            if (newItemList[k].id === inputId) {
                newItemList[k].notes = inputNotes
            }
        }
        this.setState({itemList: newItemList});
    };
    getQtyInfo = (infoQtyArr, inputId) => {
        let newItemList = [...this.state.itemList];
        for (let k = 0; k < newItemList.length; k++) {
            if (newItemList[k].id === inputId) {
                newItemList[k].qtyInfo = infoQtyArr
            }
        }
        this.setState({itemList: newItemList});
    };
    // odbieranie info od Logo
    getLogoName = (logoName, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].name = logoName
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoQty = (logoQtyArr, logoId) => {
        console.log(logoQtyArr);
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].qty = logoQtyArr
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoPrice = (logoPrice, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].price = logoPrice
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoMethod = (logoMethod, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].method = logoMethod
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoColors = (logoColors, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].colors = logoColors
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoComplexity = (logoComplexity, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].complexity = logoComplexity
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoHeight = (logoHeight, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].height = logoHeight;
                newLogoList[k].area = logoHeight * newLogoList[k].width
            }
        }
        this.setState({logoList: newLogoList});
    };
    getLogoWidth= (logoWidth, logoId) => {
        let newLogoList = [...this.state.logoList];
        for (let k = 0; k < newLogoList.length; k++) {
            if (newLogoList[k].id === logoId) {
                newLogoList[k].width = logoWidth;
                newLogoList[k].area = logoWidth * newLogoList[k].height
            }
        }
        this.setState({logoList: newLogoList});
    };
    // przejście do podsumowania
    getPricelist = () => { // metoda uruchamiana w sumOrder - ściąga konfig cecnnika z FireBase
        let priceRef = db.collection("Specs").doc("bBsNG2BYx1jqnCJLxDm3"); // kolekcja ze specyfikacją cennika
        priceRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                this.setState({priceInfo: doc.data()}) // ustawia cennik w state i przekazuje komponentowi Summary w propsie
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };

    sumOrder = (e) => {
        e.preventDefault();

        let currentTime = new Date();
        let currentMonth = currentTime.getMonth()+1;
        let orderInfo = {                     // obiekt finalny (dane wpychane w momencie submit, po pomyślnej walidacji)
            id: undefined,                            // tu ma być kolejne ID z FireBase? TODO
            date: currentTime.getFullYear()+"/"+currentMonth+"/"+currentTime.getDate(),
            status: "OPEN",
            user: "Aneta",  // tu ma być zalogowany user TODO
            customer: this.state.customer,
            item: this.state.itemList,
            logo: this.state.logoList
        };

        // wygeneruj nowe Id:
        let idRef = db.collection("Counter").doc("Count1");
        idRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Counter - data:", doc.data().counter);
                orderInfo.id = doc.data().counter + 1;
            } else {
                // doc.data() will be undefined in this case
                console.log("Counter - No such document!");
            }
        }).catch(function(error) {
            console.log("Counter - Error getting document:", error);
        });

        this.getPricelist();                  // ściągnięcie cennika z Firebase
        this.setState({order: orderInfo});    // zapisanie zamówienia do state
        this.setState({showSummary: true})    // pokazanie podsumowania (do finalnego zatwierdzenia)
    };
    editOrder = (childInfo) => {
        this.setState({showSummary: childInfo})
    };
    saveToDB = (childInfo) => { // ta funkcja do wywalenia???
        // zapisz do FireBase TODO
        this.props.whoIsVisible(childInfo)
    };

    render() {
        let orderForm = <div className={"new-order"}>
            <h1>NOWE ZLECENIE</h1>
            <div>
                <form onSubmit={this.sumOrder}>
                    <label className={"customer"}>
                        Klient:
                        <input type="text" onChange={this.getCustomer} name="customer"/>
                    </label>
                    <div className={"item-component"}>
                        {this.state.itemList.map(el => <Item
                            key={el.id} number={el.id}
                            itemValue={this.getItemValue}
                            itemColor={this.getItemColor}
                            itemNotes={this.getItemNotes}
                            itemQtyInfo={this.getQtyInfo}
                            value={""}
                            removeMe={this.removeChild}/>)}
                        <button onClick={this.addItem} className={"add-item"}>Dodaj artykuł</button>
                    </div>
                    <div className={"logo-component"}>
                        {this.state.logoList.map(el => <Logo
                            key={el.id}
                            number={el.id}
                            items={this.state.itemList}
                            complexityValue={this.logo.complexity}
                            logoName={this.getLogoName}
                            logoQty={this.getLogoQty}
                            logoPrice={this.getLogoPrice}
                            logoMethod={this.getLogoMethod}
                            logoColors={this.getLogoColors}
                            logoComplexity={this.getLogoComplexity}
                            logoHeight={this.getLogoHeight}
                            logoWidth={this.getLogoWidth}
                            removeMe={this.removeLogo} />)}
                        <button onClick={this.addLogo} className={"add-logo"}>Dodaj logo</button>
                    </div>
                    <button type="submit" className={"submit"}>OK</button>
                </form>
            </div>
        </div>;
        // po wciśnięciu submit, formularz się chowa i wyświetla się podsumowanie (metoda sumOrder):
        if (this.state.showSummary) {
            return <OrderSummary
                formInfo={this.state.itemList}
                logoInfo={this.state.logoList}
                priceInfo={this.state.priceInfo}
                orderInfo={this.state.order}
                proceed={this.saveToDB}
                backToEdit={this.editOrder} />
        } else {
            return orderForm
        }
    }
}

export default NewOrder;