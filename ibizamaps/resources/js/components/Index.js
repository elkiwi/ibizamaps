// resources/assets/js/components/Index.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Header'
import Detail from './Detail'
import List from './List'
import TextList from './TextList'
import 'bootstrap/dist/css/bootstrap.min.css';


class Index extends Component {
  render() {
    return (
      <div className="container">
			<h1>Ibiza Maps</h1>
				<Router>
					<Switch>
						<Route exact path='/' component={Header} />
						<Route path="/list" component={List} />
						<Route exact path="/detail/:id" component={Detail} />
						<Route exact path="/detail/:id" component={TextList} />
					</Switch>
				</Router>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))
