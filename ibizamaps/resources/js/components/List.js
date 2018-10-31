// resources/assets/js/components/List.js

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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


			<Router>
				<div>
					<Header />
					<h1>List</h1>
					{this.state.markers.map(marker =>
					<li key={marker.id}>
						<Link to={"/detail/" + marker.id } >{marker.name_en}</Link>
						<p>{ReactHtmlParser(marker.summary_en)}</p>
					</li>)}
				</div>
			</Router>
    )
  }
}

export default List