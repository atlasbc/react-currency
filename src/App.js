import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div className="App-link">
          <Welcome name="Visitor" />
        </div>
        <FetchData currency="EUR"/>
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
      to_currency: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.props.currency}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        rates: data.rates
      });
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
    console.log(event.target);
  }

  render() {
    const rates = this.state["rates"];
    const error = this.state["error"];

    const to_currency = this.state["to_currency"];
    const currency = this.props.currency;
    const options = [];

    for (let key in rates){
      options.push(<option value={key}>{key}</option>);
    }

    if (error) {
      return <h2>Error { error }</h2>
    }
    else {

      return (
        <div>
          { error }
          Convert {currency} to 
          <select onChange= {this.handleChange} className= "btn btn-info btn-sm dropdown-toggle">
            <option value=""></option>
            {options}
          </select>
          {/* to_currency is {to_currency} */}

          <h2>
          {to_currency ? `1 ${currency} is ${rates[to_currency]} ${to_currency}.` : "Select a currency to convert!"}
          </h2>
        </div>
      );

    }
  }
}


export default App;
