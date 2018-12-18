import React, { Component } from 'react';
import { locationList } from '../data/locations';

class Sidebar extends Component {
	state = {
		inputValue: '',
		locations: locationList,
		filteredList: null
	};

	componentDidMount() {

	}

	filterLocations = (event) => {
		const query = event.target.value.toLowerCase();

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
						return <li>{item.title}</li>	
					})}
				</ul>
			</div>
		)
	}
}

export default Sidebar;