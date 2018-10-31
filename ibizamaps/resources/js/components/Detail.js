// resources/assets/js/components/List.js

import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';

class Detail extends Component {
	constructor() {
		super()
    this.state = {details: []}
	}

  componentDidMount() {
		const id = this.props.match.params.id
		axios.get(`/api/detail/${id}`).then(
			console.log('Hello there I\'m Detail')

		/* 	response => {
			this.setState({
				details: response.data
			});
    } */).catch(errors => {
			console.log(errors);
    })
  }

  render() {
    return (
      <div>
				{this.state.details.map(detail =>
				<div className="container">
        	<h1>{detail.name_en}</h1>
					<p>{ReactHtmlParser(detail.summary_en)}</p>
						<p>Latitude: {detail.lat}</p>
						<p>Longitude: {detail.lng}</p>
				</div>
				)}
      </div>
    )
  }
}

export default Detail