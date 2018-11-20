import React, { Component } from 'react';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';



const params = { v: '3.exp', key: 'AIzaSyAehxcfvdPKYqQHo6U7gK5z_LCefG9VUHg' };

class DetailMap extends Component {


	onMapCreated(map) {
		map.setOptions({
			disableDefaultUI: true
		});
	}

	onDragEnd(e) {
		console.log('onDragEnd', e);
	}

	onCloseClick() {
		console.log('onCloseClick');
	}

	onClick(e) {
		alert('hello pete');
		console.log('onClick', e);
	}

	render() {

		return (
			<Gmaps
				width={'350px'}
				height={'250px'}
				lat={this.props.lat}
				lng={this.props.lng}
				zoom={12}
				loadingMessage={'Be happy'}
				params={params}
				onMapCreated={this.onMapCreated}>
				<Marker
					lat={this.props.lat}
					lng={this.props.lng}
					draggable={false}
					onDragEnd={this.onDragEnd} />
				<InfoWindow
					lat={this.props.lat}
					lng={this.props.lng}
					content={'Hello, React :)'}
					onCloseClick={this.onCloseClick} />
				{/* <Circle
					lat={this.props.lat}
					lng={this.props.lng}
					radius={500}
					onClick={this.onClick} /> */}
			</Gmaps>
		);
	}
}

export default DetailMap;