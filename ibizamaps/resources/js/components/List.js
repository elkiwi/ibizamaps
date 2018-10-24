// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PagesList extends Component {
  constructor() {
    super()
    this.state = {
      pages: []
    }
  }

  componentDidMount() {
    axios.get('/').then(response => {
      this.setState({
        pages: response.data
      })
    })
  }

  render() {
    console.log(this.props);
    const { pages } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>All projects</div>
              <div className='card-body'>
                <Link className='btn btn-primary btn-sm mb-3' to='/'>
                  Create new project
                    </Link>
                <ul className='list-group list-group-flush'>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PagesList