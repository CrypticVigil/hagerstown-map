import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import Sidebar from './Sidebar';
import { mapStyles } from '../data/mapStyles';
import { mapsKey } from '../data/credentials';
import '../App.css';

class App extends Component {
  state = {
    mapLoaded: false
  };

  componentWillReceiveProps() {
    if (!this.state.mapLoaded) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.615019, lng: -77.702539},
        zoom: 14,
        mapTypeControl: false,
        styles: mapStyles
      });
    }
  }

  sidebarToggle = () => {
    document.getElementById('sidebar').classList.toggle('show');
  }

  render() {
    return (
      <div className="App">
        <Sidebar close={this.sidebarToggle} />
        <button id='openBtn' onClick={this.sidebarToggle} >Open Menu</button>
        <div id='map' className='Map'></div>
      </div>
    );
  }
}

// export default App;
export default scriptLoader([
	`https://maps.googleapis.com/maps/api/js?key=${mapsKey}`
 ])(App);
