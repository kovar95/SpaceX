import React from 'react';
import './Logo.scss';
import logo from '../../images/logo.png';

const Logo = () => {
	return (
		<a className="logo" href="#">
			<img src={logo}/>
		</a>
	);
}

export {Logo};