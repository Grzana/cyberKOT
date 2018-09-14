import React from 'react';
import firebase, {db}  from './firebase_config.jsx';

class OrderSummary extends React.Component {

    updateCounter = () => {
        let idRef = db.collection("Counter").doc("Count1");
        // wyciągnięcie aktualnego id:
        idRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Counter - data:", doc.data().counter);
                // ustawienie nowego id:
                return idRef.update({
                    counter: doc.data().counter+1
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("Counter - No such document!");
            }
        }).catch(function(error) {
            console.log("Counter - Error getting document:", error);
        });
    };

    saveOrder = () => {
        db.collection("Orders").doc("Zamówienie "+this.props.orderInfo.id)
            .set(this.props.orderInfo)
            .then(() => {
                console.log("Zamówienie dodane do bazy.");
                this.updateCounter();
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        this.props.proceed("main"); // powrót na stronę główną
    };

    editOrder = () => {
        this.props.backToEdit(false)
    };

    generateItemTable = (arr) => {
        let itemTable = [];
        for (let i=0; i<arr[0].length; i++) {
            let itemRow = [];
            for (let j=0; j<arr.length; j++){
                itemRow.push(<td key={j}>{arr[j][i]}</td>)
            }
            itemTable.push(<tr key={i}>{itemRow}</tr>)
        }

        let totalPrice = arr[5].reduce((a, b) => a+b);
        let results = {
            itemTable: itemTable,
            totalPrice: totalPrice
        };
        return results
    };

    showTotalPrice = (arr) => {
        return arr.reduce((a, b) => a+b)
    };

    calculatePrice = () => { // metoda oblicza cenę dla pojedynczego logo oraz koszt opracowania logo

        let flexPrice = this.props.priceInfo.flexPrice;
        let flockPrice = this.props.priceInfo.flockPrice;
        let termoPrice = this.props.priceInfo.termoPrice;
        let smallWork = this.props.priceInfo.smallWork;
        let mediumWork = this.props.priceInfo.mediumWork;
        let bigWork = this.props.priceInfo.bigWork;
        let easyDesign = this.props.priceInfo.easyDesign;
        let easyDesignParam = this.props.priceInfo.easyDesignParam;
        let mediumDesign = this.props.priceInfo.mediumDesign;
        let mediumDesignParam = this.props.priceInfo.mediumDesignParam;
        let complexDesign = this.props.priceInfo.complexDesign;
        let complexDesignParam = this.props.priceInfo.complexDesignParam;
        let colorQty1 = this.props.priceInfo.colorQty1;
        let colorQty3 = this.props.priceInfo.colorQty3;
        let colorQty5 = this.props.priceInfo.colorQty5;
        let logoQty100 = this.props.priceInfo.logoQty100;
        let logoQty500 = this.props.priceInfo.logoQty500;
        let logoQty1000 = this.props.priceInfo.logoQty1000;

        let logoArrPricesPerEachItem = [];
        let logoArrPricesPerEachLogoDesign = [];

        let itemMasterArr = [];

        for (let i = 0; i < this.props.logoInfo.length; i++) {
            let singleLogo = this.props.logoInfo[i]; // pojedynczy obiekt z logo o unikalnym id
            let singlePrice, designPrice; // ceny wyjściowe dla danego logo (jeszcze niezdefiniowane)
            let price = singleLogo.price;
            let method = singleLogo.method;
            let colors = singleLogo.colors;
            let complexity = singleLogo.complexity;
            let area = singleLogo.area;

            if (!price) {        // w przypadku gotowego opracowanego logo zamawianego z zewnątrz
                singlePrice = 0;
                designPrice = 0
            } else {
                // 1. BASE
                switch (method) {
                    case "Flex" :
                        singlePrice = area * flexPrice;
                        break;
                    case "Flock" :
                        singlePrice = area * flockPrice;
                        break;
                    case "Termotransfer" :
                        singlePrice = area * termoPrice;
                        break;
                }
                // 2. BASE + WORK
                switch (true) {
                    case (area < 155.4) : // jeśli powierzchnia jest mniejsza od formatu A6 (cm kw.)
                        singlePrice += smallWork;
                        break;
                    case (area < 310.8) : // jeśli powierzchnia jest mniejsza od formatu A5 (cm kw.)
                        singlePrice += mediumWork;
                        break;
                    case (area >= 310.8) : // jeśli powierzchnia jest większa od formatu A5 (cm kw.)
                        singlePrice += bigWork;
                        break;
                }
                // 3. BASE + WORK + COLORS
                switch (true) {
                    case (colors = 1) : // jeśli logo składa się z 1 koloru
                        singlePrice *= colorQty1;
                        break;
                    case (colors < 4) : // jeśli logo składa się z max. 3 kolorów
                        singlePrice *= colorQty3;
                        break;
                    case (colors >= 4) : // jeśli powierzchnia jest więcej niż 3 kolorów
                        singlePrice *= colorQty5;
                        break;
                }
                // 4. BASE + WORK + COLORS + LOGO DESIGN
                switch (complexity) {
                    case (1) : // projekt łatwy (ok. 1h projektu)
                        designPrice = easyDesign;
                        singlePrice *= easyDesignParam;
                        break;
                    case (2) : // projekt średni (ok. 2h projektu)
                        designPrice = mediumDesign;
                        singlePrice *= mediumDesignParam;
                        break;
                    case (3) : // projekt trudny (ok. 3h projektu)
                        designPrice = complexDesign;
                        singlePrice *= complexDesignParam;
                        break;
                }
                // 5. BASE + WORK + COLORS + LOGO DESIGN + QTY (DISCOUNT)

                let itemsIdArr = [];  // tablica z ItemId
                let itemsNumbered = []; // tablica tylko do wyświetlania Lp. w tabeli
                let itemsQtyArr = []; // tablica z ItemQty
                let itemsColorArr = []; // tablica z ItemColor
                let itemsValuesArr = []; // tablica z ItemValue
                for (let i = 0; i < this.props.formInfo.length; i++) {
                    let item = this.props.formInfo[i];
                    itemsIdArr.push(item.id);        // tablica z ItemId potrzebna do iteracji porównawczej z tablicą Logo przechowującą ItemId, do których logo jest przypisane
                    itemsColorArr.push(item.color);  // dane do MasterTable - do generowania wierszy i kolumn ItemTable
                    itemsValuesArr.push(item.value); //  dane do MasterTable - do generowania wierszy i kolumn ItemTable
                    itemsNumbered.push(i+1);         //  dane do MasterTable - do generowania wierszy i kolumn ItemTable

                    let allSizesQty = 0;
                    for (let j = 0; j < item.qtyInfo.length; j++)
                        allSizesQty += item.qtyInfo[j].qty // push do 2giej zsumowanych ilości Itemów

                    itemsQtyArr.push(allSizesQty);
                }
                if (i === this.props.logoInfo.length-1) { // pusznąć można dopiero w ostatniej iteracji
                    itemMasterArr.push(itemsNumbered);    // STEP 0 - kolumna 0 tabeli Items !
                    itemMasterArr.push(itemsValuesArr);   // STEP 1 - kolumna 1 tabeli Items !
                    itemMasterArr.push(itemsQtyArr);      // STEP 2 - kolumna 2 tabeli Items !
                    itemMasterArr.push(itemsColorArr);    // STEP 3 - kolumna 3 tabeli Items !
                }

                let checkedItemsQty =[]; // tablica z ilościami Item dotyczącymi dane logo
                for (let j = 0; j < itemsIdArr.length; j++) {
                    if (singleLogo.qty.indexOf(itemsIdArr[j]) !== -1) { // tablica z ItemId do których logo jest przypisane - porównanie czy istnieje w tablicy ItemId danego logo
                        checkedItemsQty.push(itemsQtyArr[j]);                      // index w tablicy danego Itemu
                    } else {checkedItemsQty.push(0)}
                }

                switch (true) {
                    case (checkedItemsQty.reduce((a, b) => a + b ) < 100) : // do 100 szt. logo (suma wszystkich itemów z tablicy)
                        singlePrice *= logoQty100;
                        break;
                    case (checkedItemsQty.reduce((a, b) => a + b ) < 500) : // do 500 szt. logo
                        singlePrice *= logoQty500;
                        break;
                    case (checkedItemsQty.reduce((a, b) => a + b ) < 1000) : // do 1000 szt. logo
                        singlePrice *= logoQty1000;
                        break;
                }

                // pusznięcie do tablicy pojedynczych tablic z cenami dla konkretnych Items:
                // czyli logoArrPricesPerEachItem.length odpowiada liczbie różnych log
                // pusznięte tabliczki odpowiadają długością ilości Itemów
                logoArrPricesPerEachItem.push(Math.round(singlePrice*100)/100);

                // tablica z cenami designu dla poszczególnych logo:
                logoArrPricesPerEachLogoDesign.push(Math.round(designPrice*100)/100);
            }
        }

        itemMasterArr.push(logoArrPricesPerEachItem); // STEP 4 - kolumna 4 tabeli Items !

        let logoTimesQtyArr = []; // cena jedn. razy ilość Item - do ItemTable
        let logoTimesQtyPerItem = 0;

        for (let m=0; m < logoArrPricesPerEachItem.length; m++) {
            logoTimesQtyPerItem = itemMasterArr[2][m] * itemMasterArr[4][m];
            logoTimesQtyArr.push(Math.round(logoTimesQtyPerItem*100)/100)
        }
        itemMasterArr.push(logoTimesQtyArr); // STEP 5 - kolumna 5 tabeli Items !

        this.showTotalPrice(logoTimesQtyArr);
        return this.generateItemTable(itemMasterArr);
    };

    render() {
        let tbody = this.calculatePrice().itemTable;
        let itemTotalPrice = this.calculatePrice().totalPrice;
        let summaryDocument = <div ref={(summaryDocument) => this.summaryDocument = summaryDocument}>
            <h1>PODSUMOWANIE</h1>
            <h2>Artykuły</h2>
            <table>
                <thead>
                <tr>
                    <th key="number">Lp.</th>
                    <th key="name">Artykuł</th>
                    <th key="qty">Ilość</th>
                    <th key="color">Kolor</th>
                    <th key="priceOne">Cena/szt.<br/>[PLN]</th>
                    <th key="priceAll">Cena łączna<br/>[PLN]</th>
                </tr>
                </thead>
                <tbody>
                {tbody}
                </tbody>
                <tfoot>
                <tr>
                    <td key="total" className={"label"} colSpan={5}><span>RAZEM</span></td>
                    <td key="price"><span className={"value"}>{itemTotalPrice} zł</span></td>
                </tr>
                </tfoot>
            </table>
        </div>;

        return <div className={"summaryTable"}>
            {summaryDocument}
            <div>
                <button className={"proceed"} key="submit" onClick={this.saveOrder}>OK</button>
                <button className={"back"} key="back" onClick={this.editOrder}>POWRÓT</button>
            </div>
        </div>
    }
}

export default OrderSummary;