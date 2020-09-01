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

fetch(spacePeopleUrl)
	.then((response) => response.json())
	.then(peopleHTML)
	.catch((err) => console.log(err));

fetch(issUrl)
	.then((response) => response.json())
	.then((data) => getMap(data.iss_position))
	.catch((err) => {
		mapDiv.innerHTML = `<h1>Sorry, there was an error fetching this information.</h1>`;
		console.log(Error(err));
	});

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function peopleHTML(json) {
	let heading = `<h1>There are ${json.number} people in SPACE</h1>
                 <p>They are:</p>`;
	let list = '';
	json.people.map((person) => {
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
