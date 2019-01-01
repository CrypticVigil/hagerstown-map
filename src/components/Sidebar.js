import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import { mapsKey } from '../data/credentials';
import { locationList } from '../data/locations';

class Sidebar extends Component {
	state = {
		inputValue: '',
		locations: locationList,
		filtered: locationList
	};

	componentDidUpdate() {
		if (this.state.locations === locationList && this.props.map !== null) {
			const newLocations = this.state.locations.map( (item) => {
				item.marker = new window.google.maps.Marker({
					position: item.location,
					map: this.props.map,
					title: item.title
				});
				return item;
			});

			this.setState({ locations: newLocations});
		}
	}

	filterLocations = (event) => {
		const query = event.target.value.toLowerCase();
		const filtered = this.state.locations.filter(item => {
			const lowerCase = item.title.toLowerCase();
			const found = lowerCase.indexOf(query) > -1
			if (!found) {
				item.marker.setMap(null);
			} else if (found || query === '') {
				item.marker.setMap(this.props.map);
			}
			return found;
		});

		// this.state.markers.map( item => {
		// 	// item.setMap(null);
		// 	const lowerCase = item.title.toLowerCase();
		// 	const found = lowerCase.indexOf(query) > -1;
		// 	item.setMap(found)
		// 	return item;
		// })

		this.setState({ filtered });
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
					{this.state.filtered.map( (item) => {
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