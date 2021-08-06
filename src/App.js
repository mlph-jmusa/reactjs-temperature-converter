import './App.css';
import React from 'react';
import { TempInputFieldType } from './App.ts';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

function App() {
  return (
    <div className="App">
      <TempConversionForm/>
    </div>
  );
}

export default App;

class TempConversionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { celsius: '', farenheit: '', kelvin: '', recentInput: TempInputFieldType.Celsius };

    this.handleCelsiusTextChange = this.handleCelsiusTextChange.bind(this);
    this.handleFarenheitTextChange = this.handleFarenheitTextChange.bind(this);
    this.handleKelvinTextChange = this.handleKelvinTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCelsiusTextChange(event) {
    this.setState({ celsius: event.target.value, recentInput: TempInputFieldType.Celsius });
  }

  handleFarenheitTextChange(event) {
    this.setState({ farenheit: event.target.value, recentInput: TempInputFieldType.Farenheit });
  }

  handleKelvinTextChange(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }

    console.log(event.target.value);
    this.setState({ kelvin: event.target.value, recentInput: TempInputFieldType.Kelvin });
  }

  handleSubmit(event) {
    this.handleConversion();
    event.preventDefault();
  }

  handleConversion() {
    switch (this.state.recentInput) {
      case TempInputFieldType.Celsius:
        let newFarenheitValue = parseFloat(this.state.celsius) * (9/5) + 32;
        let newKelvinValue = parseFloat(this.state.celsius) + 273.15;
        console.log(Math.round(newKelvinValue/1000));
        
        this.setState({ farenheit: newFarenheitValue, kelvin: newKelvinValue });
        break;
      case TempInputFieldType.Farenheit:
        let newCelsiusValue = (parseFloat(this.state.farenheit) - 32) * (5/9);
        let newKelvinValue2 = (parseFloat(this.state.farenheit) - 32) * (5/9) + 273.15;

        this.setState({ celsius: newCelsiusValue, kelvin: newKelvinValue2 });
        break;
      case TempInputFieldType.Kelvin:
        let newCelsiusValue2 = parseFloat(this.state.kelvin) - 273.15;
        let newFarenheitValue2 = (parseFloat(this.state.kelvin) - 273.15) * (9/5) + 32;
        
        this.setState({ celsius: newCelsiusValue2, farenheit: newFarenheitValue2 });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TempInputField tempType={TempInputFieldType.Celsius} label='Celsius' onTextChange={this.handleCelsiusTextChange} value={this.state.celsius}/>
        <br/>
        <TempInputField tempType={TempInputFieldType.Farenheit} label='Farenheit' onTextChange={this.handleFarenheitTextChange} value={this.state.farenheit}/>
        <br/>
        <TempInputField tempType={TempInputFieldType.Kelvin} label='Kelvin' onTextChange={this.handleKelvinTextChange} value={this.state.kelvin}/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class TempInputField extends React.Component {
  render() {
    return (
      <div>
        <InputLabel>
          {this.props.label}
        </InputLabel>
        <Input type='number' value={this.props.value} onChange={this.props.onTextChange}/>
      </div>
    );
  }
}