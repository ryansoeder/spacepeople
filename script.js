// DOM Elements
const peopleDiv = document.querySelector('#people');
const mapDiv = document.querySelector('#map');

// urls to fetch/build
const spacePeopleUrl = 'http://api.open-notify.org/astros.json';
const issUrl = 'http://api.open-notify.org/iss-now.json';
const mapQuestUrl =
	'https://open.mapquestapi.com/staticmap/v5/map?key=PQxsFLRrnOeYjpsUPqnkYBqjA7uGGteU&center=';

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetchData(spacePeopleUrl)
	.then(peopleHTML);

function displayMap() {
	fetchData(issUrl)
		.then((data) => getMap(data.iss_position));

	setTimeout(displayMap, 10000); // fetchData() wrapped in displayMap() to call every 10 seconds
}

displayMap(); // called immediately

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function fetchData(url) {
	return fetch(url)
		.then(checkStatus)
		.then((response) => response.json())
		.catch((error) => console.log('Fetch error: ', error));
}

function peopleHTML(data) {
	let heading = `<h1>There are ${data.number} people in SPACE</h1>
                 <p>They are:</p>`;
	let list = '';
	data.people.map((person) => {
		list += `<ul>
                <li>Name: ${person.name}</li>
                <li>Aboard: ${person.craft}</li>
              </ul>`;
	});

	let html = heading + list;
	peopleDiv.innerHTML = html;
}

function getMap(data) {
	let map =
		mapQuestUrl +
		data.latitude +
		',' +
		data.longitude +
		'&size=500,400&zoom=4&banner=location+of+our+heros';
	mapDiv.innerHTML = `<img src=${map}>`;
}
