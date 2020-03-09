import React, {Component} from 'react';
import './Card.scss';
import moreDet from '../../images/info.png';

class Card extends Component{

	render() {
		const {missionName, uniqueId, flightNumber, launchYear, moreDetails, imageLink} = this.props;
		return (
			<div className="card">
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

export {Card};