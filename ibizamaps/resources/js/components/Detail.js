// resources/assets/js/components/List.js

import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';
import Header from './Header'

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
    return (
			<div>
			<Header />
				{this.state.details.map(detail =>
				<div className="container" key={detail.id}>
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