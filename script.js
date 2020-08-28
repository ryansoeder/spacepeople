const peopleDiv = document.querySelector('#people');
const mapDiv = document.querySelector('#map');
const spacePeopleUrl = 'http://api.open-notify.org/astros.json';

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

function getMap() {
	const issUrl = 'http://api.open-notify.org/iss-now.json';
	const mapQuestUrl =
		'https://open.mapquestapi.com/staticmap/v5/map?key=PQxsFLRrnOeYjpsUPqnkYBqjA7uGGteU&center=';

	fetch(issUrl)
		.then((response) => response.json())
		.then((json) => {
			let map =
				mapQuestUrl +
				json.iss_position.latitude +
				',' +
				json.iss_position.longitude +
				'&size=500,400&zoom=4&banner=location+of+our+heros';
			mapDiv.innerHTML = `<img src=${map}>`;
		})
		.catch((err) => {
			mapDiv.innerHTML = `<h1>Sorry, there was an error fetching this information.</h1>`;
			console.log(Error(err));
		});
	setTimeout(getMap, 10000);
}

fetch(spacePeopleUrl)
	.then((response) => response.json())
	.then(peopleHTML)
	.catch((err) => console.log(err));

getMap();
