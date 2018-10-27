// resources/assets/js/components/ProjectsList.js


import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="container">
        {this.state.markers.map(marker =>
				<li key={marker.id}>
        	<Link to={"/marker/" + marker.id } >{marker.name_en}</Link>
        </li>)}
      </div>
    )
  }
}

export default Marker