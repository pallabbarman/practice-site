// info about every countries 
fetch(`https://restcountries.eu/rest/v2/all`)
    .then(res => res.json())
    .then(data => displayCountry(data))
    .catch(error => alert("Somethings went wrong! Please try again later!"))

// display all countries info 
const displayCountry = countries => {
    document.getElementById('countriesInfo').style.display = "block";
    document.getElementById('covidInfo').style.display = "none";
    document.getElementById('weather').style.display = "none";
    const countriesInfo = document.getElementById('countries');
    countries.forEach(country => {
        const allCountry = document.createElement('div');
        allCountry.className = 'country';
        const countryInfo = `
        <img src="${country.flag}">
        <h3>${country.name}</h3>
        <p>Native Name: ${country.nativeName}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${country.languages[0].name}</p>
        <p>Region: ${country.region}</p>
        <p>Area: ${country.area}</p>
        `;
        allCountry.innerHTML = countryInfo;
        countriesInfo.appendChild(allCountry);
    });
}

// info about covid cases 
fetch('https://disease.sh/v3/covid-19/countries')
    .then(res => res.json())
    .then(data => displayCountries(data))
    .catch(error => alert("Something Went wrong! Please try again later!"));

const displayCountries = countries => {
    document.getElementById('countriesInfo').style.display = "none";
    document.getElementById('weather').style.display = "none";
    document.getElementById('covidInfo').style.display = "block";
    const countriesList = document.getElementById('countries-covid');
    countries.forEach(country => {
        const countryDetails = document.createElement('div');
        countryDetails.className = 'country';
        const countryInfo = `
                <img src="${country.countryInfo.flag}">
                <h3 class="text-center">${country.country}</h3>
                <p>New Confirmed: ${country.todayCases}</p>
                <p>New Deaths: ${country.todayDeaths}</p>
                <p>New Recovered: ${country.todayRecovered}</p>
                <p>Total Confirmed: ${country.cases}</p>
                <p>Total Deaths: ${country.deaths}</p>
                <p>Total Recovered: ${country.recovered}</p>`;
        countryDetails.innerHTML = countryInfo;
        countriesList.appendChild(countryDetails);
    });
}

// weather check 
const weather = () => {
    const cityInput = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=+${cityInput}+&appid=3784735220c23c36ea32e11d498e2fb0`)
        .then(res => res.json())
        .then(data => weatherDetails(data))
        .catch(error => alert("Please search a valid city!"));
    document.getElementById('city').value = '';
}

// weather info 
const weatherDetails = check => {
    document.getElementById('countriesInfo').style.display = "none";
    document.getElementById('weather').style.display = "block";
    document.getElementById('covidInfo').style.display = "none";
    document.getElementById('show_city').innerText = check.name;
    document.getElementById('show_temperature').innerText = Math.round(check.main.temp - 273.15);
    document.getElementById('weather_status').innerText = check.weather[0].main;
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + check.weather[0].icon + "@2x.png";
}

// enter key 
document.getElementById("city").addEventListener("keypress", function (event) {
    if (event.key == 'Enter')
        document.getElementById("search-button").click();
});