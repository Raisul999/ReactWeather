import moment from 'moment'
import './App.css';
import React, { useState } from 'react';
const proxy = "https://cors-anywhere.herokuapp.com/"
const api = {
  key: "456ac42d13f24b5764e457781128b027",
  base: "http://api.weatherstack.com/current"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${proxy}${api.base}?access_key=${api.key}&query=${query}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result)
        })

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    let time = d.getHours() + ":" + d.getMinutes() ;
    // if((d.getHours()==0 || d.getHours() <12)){
    //   time = time + "AM"
    // }else{
    //   time = time + "PM"
    // }
    return `${day} ${month} `
  }
  return (
    <div className="App ">
      <main>
        <div className="search-box" >
          <input type="text" className="search-bar" placeholder="Enter location"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.location != "undefined" && typeof weather.current != "undefined") ? (<div>
          <div className="location-box">
            <div className="location">{weather.location.name},{weather.location.country}</div>
            <div className="date">{dateBuilder(new Date())},{moment(weather.location.localtime).format('LT')}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{weather.current.temperature}°C</div>

            <div className="feel">Feels like:{weather.current.feelslike}°C</div>
            <div className="weather">{weather.current.weather_descriptions}</div>
          </div>
        </div>) : ('')}

      </main>
    </div>
  );
}

export default App;
