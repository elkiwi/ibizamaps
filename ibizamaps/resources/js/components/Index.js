// resources/assets/js/components/Index.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Header from './Header'
import List from './List'
import Single from './Single'

class Index extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <List />
          </div>
        </Router>

      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))
