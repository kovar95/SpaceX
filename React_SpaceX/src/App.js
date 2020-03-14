import React, {Component, Fragment} from 'react';
import './App.scss';
import uuid from 'react-uuid';

import {Cards} from './components/Cards/Cards';
import {Preview} from './components/Preview/Preview';
import {Header} from './components/Header/Header';
import {Favourites} from './components/Favourites/Favourites';
import {Communicators} from './Communicators';


class App extends Component {

	state = {
		data : [],
		more : '',
		filteredData : [],
		favouritesData : [],
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
		Communicators.More(flightNumber)
	  	.then( myJson => {
	  		this.setState({
	  			more: myJson,
	  		})
	  	})
	  	.catch( error => alert(`Error: ${error}`));
	}

	takeData() {
		Communicators.Fetch()
	  	.then( myJson =>  {
	  		const formatedData = this.formatData(myJson);
	  		const favouriteData = formatedData.filter( item => item.favourite);
	  		this.setState({
	  			data : formatedData,
	  			favouritesData : favouriteData,
	  			filteredData : formatedData
	  		})	
	  	})
	  	.catch( error => alert(`Error: ${error}`));
	}

	formatData(myData) {
		const data = [];
  		for(const property in myData) {
  			data.push({
  				...myData[property],
  				id: property,
  			});
  		}

  		data.forEach( item => {
  			if(!item.links) {
  				item.links = {};
  				item.links.mission_patch_small = 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png' ;
  			}
  		})

  		return data
	}

	closePreview() {
		this.setState({
			more: '',
		})
	}

	takeFavourites() {
		Communicators.Fetch()
	  	.then( myJson =>  {
	  		const formatedData = this.formatData(myJson);
	  		const favouriteData = formatedData.filter( item => item.favourite);
	  		this.setState({
	  			favouritesData : favouriteData,
	  		})	
	  	})
	  	.catch( error => alert(`Error: ${error}`));
	}

	addToFavourites(element) {
		element.favourite = !element.favourite;
		Communicators.Put(element)
		.then((response) => {
			if (response.ok) {
				this.takeFavourites();
			}
		})
		.catch( error => alert(`Error: ${error}`));
	}

	render() {
		const {filteredData, more, favouritesData} = this.state;
		const {flight_number, launch_year, mission_name, details, links, launch_success, rocket} = this.state.more;
		
		return (
			<Fragment>
				<Header  getSearched={text => this.dataSearch(text)} />
				<Cards missions={filteredData}  
					   moreDetails={flightNumber => this.moreDetails(flightNumber)} 
					   addToFavourites={ element => this.addToFavourites(element)}
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
				<Favourites missions={favouritesData}  
					  		moreDetails={flightNumber => this.moreDetails(flightNumber)} 
				/>
			</Fragment>
		)
	}
}

export default App;