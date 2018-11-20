// resources/assets/js/components/Header.js

import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';


const Header = (props) => {
    return (
      <div>
				<Jumbotron>
					<h1 className="display-3">Ibiza</h1>
					<p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
					<hr className="my-2" />
					<p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
					<p className="lead">
					<Button outline color="primary sm"><a href="/">Home</a></Button>
					<Button outline color="primary sm"><a href="/list">List</a></Button>
					</p>
				</Jumbotron>
			</div>
    )
  }
export default Header;