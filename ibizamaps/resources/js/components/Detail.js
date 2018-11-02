// resources/assets/js/components/List.js

import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';
import {Container, Col, Row} from 'reactstrap';
import Header from './Header';
import DetailMap from './DetailMap';

class Properties extends Component {
	constructor() {
		super();
		this.properties = [
			{
				center: {
					lat: 38,
					lng: 1.3
				},
				zoom: 5
			},
		];
	}
	render() {
		return (
			<div>
				<DetailMap center = {this.properties[0].center}
					zoom = {this.properties[0].zoom}  />
			</div>
		);
	}
}


class Detail extends Component {
	constructor() {
		super()
    this.state = {details: []}
	}

  componentDidMount() {
		const id = this.props.match.params.id

		//console.log(id)
		axios.get(`/api/detail/${id}`).then(response => {
			this.setState({
				details: response.data
			});

    } ).catch(errors => {
			console.log(errors);
    })
	}



  render() {
		console.log(this.props);
    return (
			<div>
			<Header />
			<Container>
				<Row>
					<Col md="4">
							<DetailMap
								/>
					</Col>
						<Col>
						{this.state.details.map(detail =>
							<div className="container" key={detail.id}>
								<h1>{detail.name_en}</h1>
								<p>{ReactHtmlParser(detail.summary_en)}</p>
								<p>Latitude: {detail.lat}</p>
								<p>Longitude: {detail.lng}</p>
							</div>
						)}
						</Col>
					</Row>
				</Container>
			</div>
    )
  }
}

DetailMap.defaultProps = {
	center: {
		lat: 38.9799,
		lng: 1.306
	},
	zoom: 13
};



export default Detail