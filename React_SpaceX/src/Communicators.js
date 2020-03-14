
class Communicators {

	static baseURL = 'https://spacex-74dbe.firebaseio.com/spacex';

	static Fetch = () => {
		return fetch(`${Communicators.baseURL}.json`)
	  		   .then( response => response.json());
	}

	static Put = (element) => {
		return fetch(`${Communicators.baseURL}/${element.id}.json`, {
			      method: 'PUT',
			      body: JSON.stringify(element)
		        })
	}

	static More = (flightNumber) => {
		return fetch(`https://api.spacexdata.com/v3/launches/${flightNumber}.json`)
	  		   .then( response => response.json())
	}

}

export { Communicators };