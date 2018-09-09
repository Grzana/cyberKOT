import React from 'react';

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: this.props.items, // na tej podstawie generowana lista z checkboxami
            checklist: [],              // tu widać które checkboxy są zaznaczone, w tablicy są id zazanczonych Itemów
            logoDesign: "nie",           // state od radio button
            checkAll: false,
            complexity: 2
        }
    }
    componentDidUpdate(prevProps) { // odświeżenie listy z nazwami Itemów
        if(prevProps.items !== this.props.items) {
            this.setState({itemList: this.props.items})
        }
    };
    removeLogo = () => { // metoda informuje o konkretnym elemencie Logo do usunięcia
        if (typeof this.props.removeMe === 'function') {
            this.props.removeMe(this.props.number)
        }
    };
    selectAll = (e) => {
        let newChecklist = [];
        if (e.target.checked) {
            console.log('checkall');
            this.setState({checkAll: true});
            for (let j=0; j<this.state.itemList.length; j++) {
                newChecklist.push(this.state.itemList[j].id)
            }
        } else {
            this.setState({checkAll: false});
            console.log('checknone');
        }
        this.setState({checklist: newChecklist});
        // wysyłka info do rodzica:
        if (typeof this.props.logoQty === 'function') {
            this.props.logoQty(newChecklist, this.props.number);
        }
        console.log(newChecklist)
    };
    selectOne = (e, itemId) => {
        let newChecklist = [...this.state.checklist];
        this.setState({checkAll: false});
      if (e.target.checked && newChecklist.indexOf(itemId) === -1) {
          newChecklist.push(itemId);
      } else {
          newChecklist = newChecklist.filter(el => el !== itemId);
      }
        // wysyłka info do rodzica:
        this.setState({checklist: newChecklist});
        if (typeof this.props.logoQty === 'function') {
            this.props.logoQty(newChecklist, this.props.number);
        }
        console.log(newChecklist);
    };
    // wysyłka danych do rodzica:
    sendLogoName = (e) => {
        if (e.target.value !== "" && typeof this.props.logoName === 'function') {
            this.props.logoName(e.target.value, this.props.number);
        }
    };
    designPlease = (e) => {
        this.setState({logoDesign: e.target.value});
        if (typeof this.props.logoPrice === 'function') {
            switch (e.target.value) {
                case "tak":
                    this.props.logoPrice(true, this.props.number);
                    break;
                case "nie":
                    this.props.logoPrice(false, this.props.number);
                    break;
            }
        }
    };
    sendLogoMethod = (e) => {
        if (typeof this.props.logoMethod === 'function') {
            this.props.logoMethod(e.target.value, this.props.number);
        }
        console.log(e.target.value)
    };
    sendLogoColors = (e) => {
        if (typeof this.props.logoColors === 'function') {
            this.props.logoColors(parseInt(e.target.value), this.props.number);
        }
    };
    sendComplexity = (e) => {
        if (typeof this.props.logoComplexity === 'function') {
            this.props.logoComplexity(parseInt(e.target.value), this.props.number);
        }
        this.setState({complexity: e.target.value})
    };
    sendLogoHeight = (e) => {
        if (typeof this.props.logoHeight === 'function') {
            this.props.logoHeight(parseInt(e.target.value), this.props.number);
        }
    };
    sendLogoWidth = (e) => {
        if (typeof this.props.logoWidth === 'function') {
            this.props.logoWidth(parseInt(e.target.value), this.props.number);
        }
    };

    render() {
        let itemValArr = [];
        for (let j=0; j<this.state.itemList.length; j++) {
          itemValArr.push(this.state.itemList[j].value)
        }
        let itemIdArr = [];
        for (let j=0; j<this.state.itemList.length; j++) {
            itemIdArr.push(this.state.itemList[j].id)
        }
        let designPart;
        if (this.state.logoDesign === "tak") {
            designPart = <div>
                <label>
                    Metoda
                    <select onChange={this.sendLogoMethod}>
                        <option>Wybierz metodę</option>
                        <option>Flock</option>
                        <option>Flex</option>
                        <option>Termotransfer</option>
                    </select>
                </label>
                <label>
                    Liczba kolorów
                    <input type="text" onChange={this.sendLogoColors}/>
                </label>
                <label>
                    Stopień skomplikowania
                    <input onChange={this.sendComplexity} type="range" min={1} max={3} step={1} value={this.state.complexity} />
                </label>
                <label >
                    Wymiary
                    <input type="text" onChange={this.sendLogoHeight} placeholder="wys." className={"dimensions"}/><span>cm</span>
                    <input type="text" onChange={this.sendLogoWidth} placeholder="szer." className={"dimensions"}/><span>cm</span>
                </label>
            </div>;
        } else {
            designPart = null;
        }

        return <div>
            <button onClick={this.removeLogo} className={"remove-logo"}>-</button>
            <span>LOGO</span>
            <label>
                <span>Nazwa logo</span>
                <input onChange={this.sendLogoName} type="text" placeholder="nazwa opcjonalna" />
            </label>
            <label>
                Wybierz artykuły
                <ul>
                    <li><input type="checkbox" value="selectAll" checked={this.state.checkAll} onChange={this.selectAll}/>Wybierz wszystkie</li>
                        {itemValArr.map((el, i) => <li key={i}>
                            <input type="checkbox"
                                   checked={this.state.checklist.includes(itemIdArr[i])}
                                   onChange={(e) => this.selectOne(e, itemIdArr[i])} />
                            Artykuł {i+1}: {el}
                    </li>)}
                </ul>
            </label>
            <label>
                Logo do opracowania
                <ul>
                    {
                        ["tak", "nie"].map((radio, i) => {
                            return (
                                <li key={i}>
                                    <input type="radio"
                                           name="logoDesign"
                                           value={radio}
                                           checked={this.state.logoDesign === radio}
                                           onChange={this.designPlease}/>
                                    {radio.toUpperCase()}
                                </li>
                            )
                        })
                    }
                </ul>
            </label>
            {designPart}
        </div>
    }
}

export default Logo;