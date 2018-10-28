// resources/assets/js/components/Header.js

import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import Button from '@material-ui/core/Button';

class Header extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
							<Button variant="contained" color="primary">
								Hello World
    					</Button>
            </div>

          </div>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Header;