// resources/assets/js/components/List.js

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
	Card, CardImg, CardText, CardBody, Container, Row, Col,
	CardTitle, Button
} from 'reactstrap';
import Header from './Header';


class List extends Component {
  constructor() {
    super()
    this.state = {markers: []}
  }

  componentDidMount() {
    axios.get('/api/marker').then(response => {
      this.setState({
        markers: response.data
			});
    }).catch(errors => {
			console.log(errors);
    })
  }

  render() {
    return (

			<Container>
				<Header />
				<Row>
				{this.state.markers.map(marker =>
						<Col md="4" key={marker.id}>
						<Card >
							<CardImg  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
							<CardBody>
								<CardTitle>{marker.name_en}</CardTitle>
								<CardText>{marker.summary_en}</CardText>
								<Button>
									<Link to={"detail/" + marker.id} >{marker.name_en}</Link>
								</Button>
							</CardBody>
						</Card>
					</Col>
				)}

				</Row>
				</Container>

    )
  }
}

export default List