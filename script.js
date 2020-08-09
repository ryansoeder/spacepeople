
const peopleDiv = document.querySelector("#people");
const address = document.querySelector("#address");
const btn = document.querySelector("button");
const spacePeopleUrl = "http://api.open-notify.org/astros.json";
const mapQuestUrl = "http://open.mapquestapi.com/geocoding/v1/address?key=PQxsFLRrnOeYjpsUPqnkYBqjA7uGGteU&location=";

function peopleHTML (json) {
    let heading = `<h1>There are ${json.number} people in SPACE</h1>
                <p>They are:</p>`;
    let list = "";
    json.people.map( (person) => {
        list += `<ul>
                <li>Name: ${person.name}</li>
                <li>Aboard: ${person.craft}</li>
                </ul>`;
    });

    let html = heading + list;
    peopleDiv.innerHTML = html;
}

function latLng (json) {
    let latitude = json.results[0].locations[0].displayLatLng.lat;
    let longitude = json.results[0].locations[0].displayLatLng.lng;
    let issUrl = "http://api.open-notify.org/iss-pass.json?lat="
                 + latitude + "&lon="+ longitude;

    console.log(latitude);
    console.log(longitude);

    fetch(issUrl)
    .then(response => response.json())
    .then(json => console.log(json));
}



fetch(spacePeopleUrl)
.then(response => response.json())
.then(peopleHTML)
.catch(err => console.log(err));

btn.addEventListener("click" , (event) => {
    event.preventDefault();

    fetch(mapQuestUrl + address.value)
    .then(response => response.json())
    .then(latLng)

});