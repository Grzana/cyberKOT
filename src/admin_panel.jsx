import React from 'react';
import firebase, {db}  from './firebase_config.jsx';

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flexPrice: 0.006,
            flockPrice: 0.007,
            termoPrice: 0.01,
            smallWork: 2,
            mediumWork: 4,
            bigWork: 6,
            easyDesign: 20,
            easyDesignParam: 1.1,
            mediumDesign: 40,
            mediumDesignParam: 1.2,
            complexDesign: 60,
            complexDesignParam: 1.3,
            colorQty1: 1,
            colorQty3: 1.2,
            colorQty5: 1.5,
            logoQty100: 1,
            logoQty500: 0.95,
            logoQty1000: 0.9
        }
    };
    //TODO: dodanie pozwoleń dla użytkowników
    toMain = () => { // zapisanie ustawień i powrót do main section
        let specsRef = db.collection("Specs");
        specsRef.doc("bBsNG2BYx1jqnCJLxDm3").set({ // ten długi ciąg znaków to nazwa konfiguracji w kolekcji Specs
            flexPrice: this.state.flexPrice,
            flockPrice: this.state.flockPrice,
            termoPrice: this.state.termoPrice,
            smallWork: this.state.smallWork,
            mediumWork: this.state.mediumWork,
            bigWork: this.state.bigWork,
            easyDesign: this.state.easyDesign,
            easyDesignParam: this.state.easyDesignParam,
            mediumDesign: this.state.mediumDesign,
            mediumDesignParam: this.state.mediumDesignParam,
            complexDesign: this.state.complexDesign,
            complexDesignParam: this.state.complexDesignParam,
            colorQty1: this.state.colorQty1,
            colorQty3: this.state.colorQty3,
            colorQty5: this.state.colorQty5,
            logoQty100: this.state.logoQty100,
            logoQty500: this.state.logoQty500,
            logoQty1000: this.state.logoQty1000
             });
            console.log("cennik pusznięty do DB.");

        this.props.whoIsVisible("main")
    };
    setValue = (e, name) => {
      this.setState({[name]: e.target.value})
    };
    render() {
        return <div>
            <h1>YOU CAN DO IT!!!!</h1>
            <div>
                <h2>User List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Lp.</th>
                        <th>Login</th>
                        <th>Hasło</th>
                        <th>Firma</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Aneta</td>
                        <td>aaa</td>
                        <th>Admin</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Kalkulator ceny</h2>
                <h3>Podstawa - koszt folii</h3>
                <label>
                    FLEX: Cena (PLN) za 1cm
                    <input type="text" name={"flexPrice"} value={0.006} onChange={(e) => this.setValue(e, "flexPrice")}/>
                </label>
                <label>
                    FLOCK: Cena za 1cm
                    <input type="text" name={"flockPrice"} value={0.007} onChange={(e) => this.setValue(e, "flockPrice")}/>
                </label>
                <label>
                    TERMO: Cena za 1cm
                    <input type="text" name={"termoPrice"} value={0.01} onChange={(e) => this.setValue(e, "termoPrice")}/>
                </label>
                <h3>Robocizna</h3>
                <label>
                    Mały nadruk (max. A6)
                    <input type="text" name={"smallWork"} value={2} onChange={(e) => this.setValue(e, "smallWork")}/>
                </label>
                <label>
                    Średni nadruk (max. A5)
                    <input type="text" name={"mediumWork"} value={4} onChange={(e) => this.setValue(e, "mediumWork")}/>
                </label>
                <label>
                    Duży nadruk (max. A4)
                    <input type="text" name={"bigWork"} value={6} onChange={(e) => this.setValue(e, "bigWork")}/>
                </label>
                <h3>Opracowanie logo</h3>
                <label>
                    Logo proste (max 1h)
                    <input type="text" name={"easyDesign"} value={20} onChange={(e) => this.setValue(e, "easyDesign")}/>
                    <input type="text" name={"easyDesignParam"} value={1.1} onChange={(e) => this.setValue(e, "easyDesignParam")}/>
                </label>
                <label>
                    Logo średnie (max 2h)
                    <input type="text" name={"mediumDesign"} value={40} onChange={(e) => this.setValue(e, "mediumDesign")}/>
                    <input type="text" name={"mediumDesignParam"} value={1.2} onChange={(e) => this.setValue(e, "mediumDesignParam")}/>
                </label>
                <label>
                    Logo trudne (max 3h)
                    <input type="text" name={"complexDesign"} value={60} onChange={(e) => this.setValue(e, "complexDesign")}/>
                    <input type="text" name={"complexDesignParam"} value={1.3} onChange={(e) => this.setValue(e, "complexDesignParam")}/>
                </label>
                <h3>Liczba kolorów</h3>
                <label>
                    1 kolor
                    <input type="text" name={"colorQty1"} value={1} onChange={(e) => this.setValue(e, "colorQty1")}/>
                </label>
                <label>
                    Max 3 kolory
                    <input type="text" name={"colorQty3"} value={1.2} onChange={(e) => this.setValue(e, "colorQty3")}/>
                </label>
                <label>
                    Max 5 kolorów
                    <input type="text" name={"colorQty5"} value={1.5} onChange={(e) => this.setValue(e, "colorQty5")}/>
                </label>
                <h3>Wielkość zamówienia</h3>
                <label>
                    Max 100 szt.
                    <input type="text" name={"logoQty100"} value={1} onChange={(e) => this.setValue(e, "logoQty100")}/>
                </label>
                <label>
                    Max 500 szt.
                    <input type="text" name={"logoQty500"} value={0.95} onChange={(e) => this.setValue(e, "logoQty500")}/>
                </label>
                <label>
                    Max 1000 szt.
                    <input type="text" name={"logoQty1000"} value={0.9} onChange={(e) => this.setValue(e, "logoQty1000")}/>
                </label>
            </div>
            <button onClick={this.toMain}>BACK</button>
        </div>
    }
}

export default AdminPanel;