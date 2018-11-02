import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;


class DetailMap extends Component {

	render(props) {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '400px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyAehxcfvdPKYqQHo6U7gK5z_LCefG9VUHg'}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
				>
					<AnyReactComponent
						lat={59.955413}
						lng={30.337844}
						text={'Kreyser Avrora'}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

DetailMap.defaultProps = {
	center: {
		lat: 59.95,
		lng: 30.33
	},
	zoom: 11
};

export default DetailMap;