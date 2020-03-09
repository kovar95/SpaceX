import React, {Component} from 'react';
import './Preview.scss';
import uuid from 'react-uuid';

class Preview extends Component{

	render() {
		const {flightNumber, launchYear, missionName, moreDetails, launchSuccess, nationality, flightPic, missionSimbol} = this.props;
		return (
			<div className="show">
				<section className="preview">
					<p>Mission Preview</p>
					
					<span className="first">
						<strong>Mission name:</strong> {missionName}
					</span>
					<span>
						<strong>Flight number:</strong> {flightNumber}
					</span>
					<span>
						<strong>Launch Year:</strong> {launchYear}
					</span>
					<span>
						<strong>Nationality:</strong> {nationality} 
					</span>
					<span>
						<strong>Launch success:</strong> {launchSuccess ? "Successful" : "Failed"} 
					</span>
				
					<span>
						<strong>Photos:</strong>
					</span>

					<div className="pics">
						{flightPic.map( pic => {
							return (
								<a href={pic} target="_blank" key={uuid()}>
									<img src={pic}/>
								</a>
							)
						})}
					</div>

					<span>
						<strong>Details:</strong> {moreDetails} 
					</span>

					<img src={missionSimbol} />
					
					<button onClick={ () => this.props.closePreview()}>X</button>
				</section>
			</div>
		)
	}
}

export {Preview};