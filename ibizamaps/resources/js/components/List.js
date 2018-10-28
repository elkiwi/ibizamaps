// resources/assets/js/components/List.js


import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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
      <div>
        {this.state.markers.map(marker =>
				<li key={marker.id}>
        	<Link to={"/marker/" + marker.id } >{marker.name_en}</Link>
						<p>{ReactHtmlParser(marker.summary_en)}</p>
        </li>)}
      </div>
    )
  }
}

export default Marker