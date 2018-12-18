import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import { mapsKey } from '../data/credentials';
import { locationList } from '../data/locations';

class Sidebar extends Component {
	state = {
		inputValue: '',
		locations: locationList,
		filteredList: null
	};

	componentDidUpdate() {
		locationList.map( (item) => {
			const marker = new window.google.maps.Marker({
				position: item.location,
				map: this.props.map,
				title: item.title
			});
			return marker;
		});
	}

	filterLocations = (event) => {
		const query = event.target.value.toLowerCase();
		const filtered = locationList.filter(item => {
			const lowerCase = item.title.toLowerCase();
			return lowerCase.indexOf(query) > -1;
		});

		filtered.map();

		this.setState({ locations: filtered });
		this.setState({ inputValue: query });
	};

	render() {
		const { inputValue } = this.state;

		return (
			<div id='sidebar' className='Sidebar'>
				<div id='closeBtn' onClick={this.props.close} >&times;</div>
				<h1>Hagerstown, MD</h1>
				<input placeholder='Filter Locations' value={inputValue} onChange={this.filterLocations}/>
				<ul>

					{this.state.locations.map( (item) => {
						return <li key={item.key} >{item.title}</li>	
					})}
				</ul>
			</div>
		)
	}
}

// export default Sidebar;
export default scriptLoader([
	`https://maps.googleapis.com/maps/api/js?key=${mapsKey}`
 ])(Sidebar);