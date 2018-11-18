// resources/assets/js/components/List.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import {Container, Col, Row} from 'reactstrap';
import Header from './Header';
import DetailMap from './DetailMap';
import List from './TextList';



class Detail extends Component {

	constructor() {
		super()
		this.state = {details: []}
		console.log('Constructor Detail')
	}

  componentDidMount() {
		const id = this.props.match.params.id
		console.log('Component did mount Detail')

		//console.log(id)
		axios.get(`/api/detail/${id}`).then(response => {
			this.setState({
				details: response.data
			});

			this.state.details.map(detail =>
			this.setState({
					lat:detail.lat,
					lng:detail.lng
			}))

    } ).catch(errors => {
			console.log(errors);
    })
	}


  render() {
		console.log('Render Detail')


		return (
			<div>
			<Header />
			<Container>
				<Row>
					<Col>
						{this.state.details.map(detail =>

							<div className="container" key={detail.id}>
								<h1>{detail.name_en}</h1>
								<img src={'/images/pages/' + detail.id + '/' + detail.filename + ''} />
								<p className="lead">{ReactHtmlParser(detail.summary_en)}</p>
								{ReactHtmlParser(detail.html_en)}
							</div>

						)}
					</Col>
					<Col md="4">
							<DetailMap
								zoom = {15}
								lat={this.state.lat}
								lng={this.state.lng}
								/>
							<List />
					</Col>
					</Row>
				</Container>
			</div>
    )
  }
}



export default Detail