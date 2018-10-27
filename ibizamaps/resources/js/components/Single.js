// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Single extends Component {
  constructor() {
    super()
    this.state = {markers: []}
  }

  componentDidMount() {
    axios.get('/api/marker/{id}').then(response => {
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
        <div>
          <h3>{marker.name_en}</h3>
          <p>{marker.date_added}</p>
        </div>
          )}
      </div>
    )
  }
}

export default Single