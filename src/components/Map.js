import React, { Component } from 'react';

class Map extends Component {
	render() {
		return (
			<div id='map' className='Map'>
				<button id='openBtn' onClick={this.props.open} >Open Menu</button>
			</div>
		)
	}
}

export default Map;