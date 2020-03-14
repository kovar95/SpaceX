import React, {Component} from 'react';
import './Favourites.scss';
import {Fav} from '../Fav/Fav';

class Favourites extends Component{

	render() {
		const {moreDetails, missions} = this.props;
		return (
			<div className="favourites">
			<h3>Favourite flights</h3>
			{missions.map( element => <Fav 
										key={element.id}
										uniqueId={element.id}
										flightNumber={element.flight_number}
										launchYear={element.launch_year}
										imageLink={element.links.mission_patch_small}
										missionName={element.mission_name}
										moreDetails={moreDetails}
										element={element}
									  />
						)
			}
			</div>
		)
	}
}

export {Favourites};