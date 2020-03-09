import React, {Component} from 'react';
import './Cards.scss';
import {Card} from '../Card/Card';
import uuid from 'react-uuid';

class Cards extends Component{

	render() {
		const {moreDetails, missions} = this.props;
		return (
			<div className="cards">
			{missions.map( element => <Card 
										key={element.key}
										uniqueId={element.key}
										flightNumber={element.flight_number}
										launchYear={element.launch_year}
										imageLink={element.links.mission_patch_small}
										missionName={element.mission_name}
										moreDetails={moreDetails}
									  />
						)
			}
			</div>
		)
	}
}

export {Cards};