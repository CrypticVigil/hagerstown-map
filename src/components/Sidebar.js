import React, { Component } from 'react';

class Sidebar extends Component {

	render() {
		return (
			<div id='sidebar' className='Sidebar'>
				<div id='closeBtn' onClick={this.props.close} >&times;</div>
				<h1>Hagerstown, MD</h1>
			</div>
		)
	}
}

export default Sidebar;