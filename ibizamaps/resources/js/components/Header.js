// resources/assets/js/components/Header.js

import React, { Component } from 'react';



class Header extends Component {
  render() {
    return (
      <div className="container">
				<h2>Header menu</h2>
				<span><a href="/">Home</a></span> | <span><a href="/list">List</a></span>
			</div>
    )
  }
}
export default Header;