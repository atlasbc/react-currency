import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div className="App-link">
          <Welcome name="Visitor" />
        </div>
        <FetchData currency="USD"/>
      </header>
    </div>
  );
}

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rates: "",
      error: null,
      base_currency: this.props.currency,
      to_currency: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.currency_dict = {
      "CAD": "Canadian Dollar",
      "HKD": "Hong Kong Dollar",
      "ISK": "Icelandic króna",
      "PHP": "Philippine peso",
      "DKK": "Danish Krone",
      "HUF": "Hungarian Forint",
      "CZK": "Czech Koruna",
      "GBP": "Great Britain Pound",
      "RON": "Romanian Leu",
      "SEK": "Swedish Krona",
      "IDR": "Indonesian Rupiah",
      "INR": "Indian Rupee",
      "BRL": "Brazilian Real",
      "RUB": "Russian Ruble",
      "HRK": "Croatian Kunas",
      "JPY": "Japanese Yen",
      "THB": "Thai Baht",
      "CHF": "Swiss Franc",
      "EUR": "Euro",
      "MYR": "Malaysian Ringgit",
      "YR": "Yemeni Rial",
      "BGN": "Bulgarian Lev",
      "TRY": "Turkish Lira",
      "CNY": "Chinese Yuan",
      "NOK": "Norwegian Krone",
      "NZD": "New Zealand Dollar",
      "ZAR": "South African Rand",
      "USD": "Dollar",
      "MXN": "Mexican Peso",
      "SGD": "Singapore Dollar",
      "AUD": "Australian Dollar",
      "ILS": "Israeli New Shekel",
      "KRW": "South Korean won",
      "PLN": "Poland zloty"
    }
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base_currency}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        rates: data.rates
      });
      console.log("ComponentDidMount() Lifecycle");
    })
    .catch(error => {
      this.setState({
        error: error
      })
      console.log('Error:', error);
    });
  }

  handleChange(event){
    this.setState({to_currency: event.target.value});
    console.log("in handleChange event.target",event.target);
  }
  
  handleSwitch(event){
    const dummy = this.state.base_currency;
    console.log("before", this.state.base_currency);
    this.setState({base_currency: this.state.to_currency});
    console.log("after", this.state.base_currency);
    console.log("before", this.state.to_currency);
    this.setState({to_currency : dummy});
    console.log("after", this.state.to_currency);

    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base_currency}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        rates: data.rates
      });
      console.log("fetch is called");
    })
    .catch(error => {
      this.setState({
        error: error
      })
      console.log('Error:', error);
    });

    console.log("event.target.parentNode is", event.target.parentNode);
    console.log(event.target.parentNode.querySelector("select"));
  }

  render() {
    console.log("IN RENDER PROCESS");
    const rates = this.state["rates"];
    const error = this.state["error"];
    console.log(rates);

    const to_currency = this.state["to_currency"];
    const currency_value = rates[to_currency];
    console.log("currency_value is ", currency_value);

    const options = [];
    console.log("in render currency value", currency_value);
    console.log("in render base_currency", this.state.base_currency);
    console.log("in render to_currency", to_currency);

    for (let key in rates){
      options.push(<option value={key}>{this.currency_dict[key]}</option>);
    }

    if (error) {
      return <h2>Error { error }</h2>
    }
    else {

      return (
        <div className="currency-container">
          {to_currency}
          <div className="convert-container"> 
          Convert {this.currency_dict[this.state.base_currency]} to 
          <select value={to_currency} onChange={this.handleChange}  className= "btn btn-info btn-sm dropdown-toggle">
            <option value=""></option>
            {options}
          </select>
          {/* to_currency is {to_currency} */}
          <span onClick={this.handleSwitch}> Test</span>
          
          </div>

          <h2 className="result">
          {to_currency ? 
          `1 ${this.currency_dict[this.state.base_currency]} is ${parseFloat(currency_value).toFixed(2)} ${this.currency_dict[to_currency]}.` 
          : "Select a currency to convert!"}
          </h2>

        </div>
      );

    }
  }
}


export default App;
