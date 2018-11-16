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
		{
			this.state.details.map(detail =>
			{
				this.center = { lat: detail.lat, lng: detail.lng}
			}
			)
		}
		return (
			<div>
			<Header />
			<Container>
				<Row>
					<Col md="4">
							<DetailMap
								center = {this.center}
								zoom = {12} />
							<List />
					</Col>
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
					</Row>
				</Container>
			</div>
    )
  }
}

Detail.propTypes = {
	//center: PropTypes.array.isRequired,
	//zoom: PropTypes.number.isRequired

}





export default Detail