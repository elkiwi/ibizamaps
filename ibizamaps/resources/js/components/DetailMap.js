import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class DetailMap extends Component {

	render() {

		//console.log(this.props)
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '400px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: 'AIzaSyAehxcfvdPKYqQHo6U7gK5z_LCefG9VUHg',
						styles: [{
									"featureType": "all",
									"elementType": "labels",
									"stylers": [{
										"visibility": "#on"
									}]
							}]}}
					center={this.props.center}
					defaultZoom={this.props.zoom}
				>
				</GoogleMapReact>
			</div>
		);
	}
}

/* DetailMap.defaultProps = {
	center: {
		lat: 59.95,
		lng: 30.33
	},
	zoom: 11
}; */


export default DetailMap;