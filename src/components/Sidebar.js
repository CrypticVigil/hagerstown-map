import React, { Component } from 'react';
import scriptLoader from "react-async-script-loader";
import { mapsKey } from '../data/credentials';
import { locationList } from '../data/locations';
import foursquareLogo from '../images/foursquare.png';

class Sidebar extends Component {
	state = {
		inputValue: '',
		locations: locationList,
		markersLoaded: false,
		foursquareLoaded: false,
		filtered: locationList
	};

	componentDidUpdate() {
		const { map } = this.props;
		if (this.state.locations === locationList && map !== null) {
			const newLocations = this.state.locations.map( (item) => {
				item.marker = new window.google.maps.Marker({
					position: item.location,
					map: map,
					title: item.title,
					infowindow: new window.google.maps.InfoWindow({
						content: item.title
					})
				});
				item.marker.addListener('click', function() {
					item.marker.infowindow.open(map, item.marker);
				});
			
				return item;
			});

			this.setState({ locations: newLocations});
			this.setState({ markersLoaded: true});
		}

		if (this.state.markersLoaded && !this.state.foursquareLoaded) {
			const foursquareData = this.state.locations.map( (item) => {

				fetch('https://api.foursquare.com/v2/venues/search?ll=' + item.location.lat + ', ' + item.location.lng + '&client_id=DMI2YE0INDUQ3LVK3F0VNB5ZCCPWIVUTJR3LVBVGU40D3TQZ&client_secret=MXASP03WTKJB5HDK4N0TU011RFCTUQPSGKI3RE40INMD1ZRD&v=20180323&limit=3&radius=300&query=' + item.title)
				.then( response => response.json() )
				.then( data => {
					const fsItem = data.response.venues[0];
					console.log(fsItem);
		
					let fsContent = `<div>
							<h2>${fsItem.name}</h2>
							<p>Type: ${fsItem.categories[0].name}</p>
							<p>Address: ${fsItem.location.address || 'Address not found.'}</p>
						</div>`;

					return fsContent;
					})
					.then( data => {
						item.marker.infowindow = new window.google.maps.InfoWindow({
							content: data
						})
					});
				// console.log(fsInfo); // Work here on getting the fsInfo data to show up here
				// item.marker.infowindow.content = fsInfo;
				return item;
			});

			this.setState({ foursquareLoaded: true });
			this.setState({ locations: foursquareData });
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

		this.setState({ filtered });
		this.setState({ inputValue: query });
	};

	listHandler = (event) => {
		for ( let item of this.state.filtered ) {
			if ( item.title === event.target.innerHTML ) {
				item.marker.setAnimation(window.google.maps.Animation.BOUNCE);
				setTimeout( () => item.marker.setAnimation(null), 2100 )
			}
		}
	}

	render() {
		const { inputValue } = this.state;

		return (
			<div id='sidebar' className='Sidebar'>
				<div id='closeBtn' onClick={this.props.close} >&times;</div>
				<h1>Hagerstown, MD</h1>
				<input placeholder='Filter Locations' value={inputValue} onChange={this.filterLocations}/>
				<ul>
					{this.state.filtered.map( (item) => {
						return <li 
							key={item.key} 
							onClick={this.listHandler}
							onKeyPress={this.listHandler} 
							tabIndex={0} 
							role={'button'} 
							>{item.title}</li>	
					})}
				</ul>
				<img src={foursquareLogo} alt="Foursquare Logo" />
			</div>
		)
	}
}

// export default Sidebar;
export default scriptLoader([
	`https://maps.googleapis.com/maps/api/js?key=${mapsKey}`
 ])(Sidebar);