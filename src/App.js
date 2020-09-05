import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var test_url = "/api/hello-world";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : "no message",
    };
  }
  
  componentDidMount() {
    fetch(test_url)
      .then(res => res.json())
      .then((data) => {
        this.setState({message:data["message"]});
      }).catch(console.log)
  }
  render() {
    if (Object.keys(this.state.message).length === 0) return <div>Loading....</div>;
    var message = this.state.message;
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          { message }
        </p>
      </header>
    </div>  
    );
  }
}

export default App;
