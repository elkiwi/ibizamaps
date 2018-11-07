// resources/assets/js/components/List.js

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
	Row, Col
} from 'reactstrap';



class TextList extends Component {
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


				<ul>
				{this.state.markers.map(marker =>

							<li key={marker.id}><Link to={"/detail/" + marker.id} >{marker.name_en}</Link></li>

				)}
				</ul>


    )
  }
}

export default TextList