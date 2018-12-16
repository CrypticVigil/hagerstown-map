import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import '../App.css';

class App extends Component {
  state = {

  };

  sidebarToggle = () => {
    document.getElementById('sidebar').classList.toggle('show');
  }

  render() {
    return (
      <div className="App">
        <Sidebar close={this.sidebarToggle} />
        <Map open={this.sidebarToggle} />
      </div>
    );
  }
}

export default App;
