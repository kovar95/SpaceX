import React, {Component} from 'react';
import './Header.scss';
import {Search} from '../Search/Search';
import {Logo} from '../Logo/Logo';

class Header extends Component{

	render() {
		const {getSearched} = this.props;
		return (
			<header>
				<div className="main-wrapper">
					<Logo/>
					<Search onDataSearch={getSearched} />
				</div>
			</header>
		)
	}
}

export {Header};