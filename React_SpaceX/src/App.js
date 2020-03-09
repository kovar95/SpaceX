import React, {Component, Fragment} from 'react';
import './App.scss';
import uuid from 'react-uuid';



import {Cards} from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';

class App extends Component {

	state = {
		data : [],
		more : '',
		filteredData : [],
	}

	componentDidMount(){
		this.takeData();
	}

	sortFlights(a,b){
		const nameA = a.mission_name.toLowerCase();
		const nameB = b.mission_name.toLowerCase();

		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}

		return comparison;
	}

	sort() {
		const myArr = [...this.state.data];
		const filterArr = [...this.state.filteredData];
		myArr.sort(this.sortFlights);
		filterArr.sort(this.sortFlights);
		this.setState({
			data : myArr,
			filteredData : filterArr,
		})
	}

	dataSearch(text) {
		const filteredData = this.state.data.filter( item => {
			return item.mission_name.toLowerCase().includes(text.toLowerCase().trim())
		})
	  	this.setState({
	  		filteredData : filteredData,
	  	})
	}

	moreDetails(flightNumber){
		let request = `https://api.spacexdata.com/v3/launches/${flightNumber}`;
		fetch(request)
	  	.then( response => response.json())
	  	.then( myJson => {
	  		this.setState({
	  			more: myJson,
	  		})
	  	})
	  	.catch( error => alert(`Error: ${error}`));

	}

	takeData() {
		let request = `https://api.spacexdata.com/v3/launches`;
		fetch(request)
	  	.then( response => response.json())
	  	.then( myJson => {
	  		myJson.forEach( flight => {
	  			flight.key = uuid();
	  		})
	  		this.setState({
	  			data : myJson,
	  			filteredData : myJson,
	  		})
	  	})
	  	.catch( error => alert(`Error: ${error}`));
	}

	closePreview() {
		this.setState({
			more: '',
		})
	}

	render() {
		const {filteredData, more} = this.state;
		const {flight_number, launch_year, mission_name, details, links, launch_success, rocket} = this.state.more;
		
		return (
			<Fragment>
				<Header  getSearched={(text) => this.dataSearch(text)} />
				<Cards missions={filteredData}  
					   moreDetails={flightNumber => this.moreDetails(flightNumber)} 
				/>
				<button className="sort" 
						onClick={ () => this.sort()}>
						Sort
				</button>
				{more && <Preview flightNumber={flight_number}
								  launchYear={launch_year}
								  missionName={mission_name}
								  moreDetails={details}
								  flightPic={links.flickr_images}
								  launchSucces={launch_success}
								  nationality={rocket.second_stage.payloads[0].nationality}
								  closePreview={() => this.closePreview()}
								  missionSimbol={links.mission_patch_small}
						 /> 
				}
			</Fragment>
		)
	}
}

export default App;