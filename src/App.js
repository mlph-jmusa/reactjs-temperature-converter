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

    this.state = { celsius: '', farenheit: '', kelvin: ''};

    this.handleCelsiusTextChange = this.handleCelsiusTextChange.bind(this);
    this.handleFarenheitTextChange = this.handleFarenheitTextChange.bind(this);
    this.handleKelvinTextChange = this.handleKelvinTextChange.bind(this);
  }

  handleCelsiusTextChange(event) {
    this.setState({ celsius: event.target.value });
    
    this.handleConversion(event.target.value, TempInputFieldType.Celsius);
  }

  handleFarenheitTextChange(event) {
    this.setState({ farenheit: event.target.value });

    this.handleConversion(event.target.value, TempInputFieldType.Farenheit);
  }

  handleKelvinTextChange(event) {
    if (event.target.value < 0) {
      event.target.value = 0;
    }

    this.setState({ kelvin: event.target.value });

    this.handleConversion(event.target.value, TempInputFieldType.Kelvin);
  }

  handleConversion(value, tempInputType) {
    if (value !=='') {
      switch (tempInputType) {
        case TempInputFieldType.Celsius:
          let newFarenheitValue = parseFloat(value) * (9/5) + 32;
          let newKelvinValue = parseFloat(value) + 273.15;
          
          this.setState({ farenheit: newFarenheitValue, kelvin: newKelvinValue });
          break;
        case TempInputFieldType.Farenheit:
          let newCelsiusValue = (parseFloat(value) - 32) * (5/9);
          let newKelvinValue2 = (parseFloat(value) - 32) * (5/9) + 273.15;
  
          this.setState({ celsius: newCelsiusValue, kelvin: newKelvinValue2 });
          break;
        case TempInputFieldType.Kelvin:
          let newCelsiusValue2 = parseFloat(value) - 273.15;
          let newFarenheitValue2 = (parseFloat(value) - 273.15) * (9/5) + 32;
          
          this.setState({ celsius: newCelsiusValue2, farenheit: newFarenheitValue2 });
          break;
        default:
          break;
      }
    } else {
      this.setState({ celsius: '', farenheit: '', kelvin: '' });
    }
  }

  render() {
    return (
      <div>
        <TempInputField tempType={TempInputFieldType.Celsius} label='Celsius' onTextChange={this.handleCelsiusTextChange} value={this.state.celsius}/>
        <br/>
        <TempInputField tempType={TempInputFieldType.Farenheit} label='Farenheit' onTextChange={this.handleFarenheitTextChange} value={this.state.farenheit}/>
        <br/>
        <TempInputField tempType={TempInputFieldType.Kelvin} label='Kelvin' onTextChange={this.handleKelvinTextChange} value={this.state.kelvin}/>
        </div>
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