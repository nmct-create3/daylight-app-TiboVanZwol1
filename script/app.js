// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
	//Get hours from milliseconds
	const date = new Date(timestamp * 1000);
	// Hours part from the timestamp
	const hours = '0' + date.getHours();
	// Minutes part from the timestamp
	const minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp (gebruiken we nu niet)
	// const seconds = '0' + date.getSeconds();

	// Will display time in 10:30(:23) format
	return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

function toMinutes(value){
	return (60 * parseInt(value.charAt(0)+value.charAt(1)) + parseInt(value.charAt(3) + value.charAt(4)));
}

function changeTheme(theme){
	if (theme == 'dark'){
		if (!document.querySelector('body').classList.contains("is-night")){
	document.querySelector('body').className += ' is-night';}

    }else if (theme == 'light'){
		if (document.querySelector('body').classList.contains("is-night")){
	document.querySelector('body').className += ' is-night';}
	}
}

const getAPINewWay = async function(url) {
	// const data = await fetchData(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=11e9b7972a8802bd321eeb8c99716b3e&units=metric&lang=nl&cnt=1`);
	// console.info(data);
	const get = await fetch(url);
	const data = await get.json();
	//console.log({ data });
	showResult(data);
};

// 5 TODO: maak updateSun functie
var timerID = setInterval(function(){
getAPI(50.8027841, 3.2097454);
}, 60 * 1000);

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise,sunset) => {
	let d = new Date();
	let zon = document.querySelector('.js-sun');

	time ='00:00'// (d.getHours() + ':' + d.getMinutes());
	zon.setAttribute('data-time', time );

	if (toMinutes(time) < toMinutes(sunset) && toMinutes(time) > toMinutes(sunrise)){
		changeTheme('light');
	let nowMinutes = toMinutes(time);
	let sunriseMinutes = toMinutes(sunrise);
	let sunsetMinutes = toMinutes(sunset);
	sunPercent = ((nowMinutes - sunriseMinutes)/totalMinutes)*100;

	document.querySelector('.js-time-left').innerHTML = (sunsetMinutes - nowMinutes);

	if (sunPercent<=50){
	zon.style.bottom = sunPercent * 2 + '%';
	}
	else{
	zon.style.bottom =	((50 - (sunPercent - 50))*2) + '%';
	}
	zon.style.left = sunPercent +'%';

} else if(toMinutes(time) > toMinutes(sunset)){
	changeTheme('dark');
	document.querySelector('.js-time-left').innerHTML = '0';
	zon.style.left = '100%';
	zon.style.bottom = '0%';
}else{
	document.querySelector('.js-time-left').innerHTML = totalMinutes;
	changeTheme('dark');
	zon.style.left = '0%';
	zon.style.bottom = '0%';
}
	
	
	// console.log(totalMinutes);


	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.
	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	document.querySelector('.js-sunrise').innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise);
	document.querySelector('.js-sunset').innerHTML = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset);
	document.querySelector('.js-location').innerHTML = queryResponse.city.name;


	time = _parseMillisecondsIntoReadableTime(queryResponse.city.sunset - queryResponse.city.sunrise-3600)
	placeSunAndStartMoving(toMinutes(time), _parseMillisecondsIntoReadableTime(queryResponse.city.sunrise),_parseMillisecondsIntoReadableTime(queryResponse.city.sunset));

	// We gaan eerst een paar onderdelen opvullen
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	// Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = (lat, lon) => {
	let apiurl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=11e9b7972a8802bd321eeb8c99716b3e&units=metric&lang=nl&cnt=1`;
	getAPINewWay(apiurl);
	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.2097454);
	// 50.820856, 3.256039
});



