// resources/assets/js/components/List.js


import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Detail from './Detail';
class Marker extends Component {
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
        {this.state.markers.map(marker =>
				<li key={marker.id}>
        	<Link to={"/detail/" + marker.id } >{marker.name_en}</Link>
						<Route path="/detail/{marker.id}"  component={Detail} />
						<p>{ReactHtmlParser(marker.summary_en)}</p>
        </li>)}
      </div>
			</Router>
    )
  }
}

export default Marker