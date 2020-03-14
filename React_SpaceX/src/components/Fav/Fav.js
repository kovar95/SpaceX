import React, {Component} from 'react';
import './Fav.scss';
import moreDet from '../../images/info.png';

class Fav extends Component{

	render() {
		const {missionName, uniqueId, flightNumber, launchYear, moreDetails, imageLink, element} = this.props;
		return (
			<div className="favy">
				<span>
					<strong>Flight number:</strong><br/> &rarr; {flightNumber} 
				</span>
				<span>
					<strong>Mission name:</strong><br/> &rarr; {missionName} 
				</span>
				<span>
					<strong>Year:</strong><br/> &rarr; {launchYear} 
				</span>
				<img src={imageLink}/>
				<div className="more" onClick={() => moreDetails(flightNumber)}>
					<img src={moreDet} />
				</div>
			</div>
		)
	}
}

export {Fav};