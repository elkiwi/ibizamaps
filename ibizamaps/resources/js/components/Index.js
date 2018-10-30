// resources/assets/js/components/Index.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header'
import Blog from './Blog'
import Detail from './Detail'

class Index extends Component {
  render() {
    return (
      <div className="container">
						<Header />
				<Router>
					<Switch>
						<Route path='/list' component={Blog} />
						<Route get='/detail/:id' component={Detail} />
					</Switch>
				</Router>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))
