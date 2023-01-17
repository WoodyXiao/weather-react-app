import React, { useState, useEffect } from "react";
import "./App.css";
const api = {
  key: "f764a75a1789e0be27e71bbe0e5dcd86",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weather1, setWeather1] = useState([]);

  // const search1 = evt => {
  //   if (evt.key === "Enter") {
  //     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setWeather(result);
  //         setQuery('');
  //         console.log(result);
  //       });

  //     fetch(`${api.base}forecast?q=${query}&cnt=8&APPID=${api.key}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setWeather1(result.list);
  //         setQuery('');
  //         console.log(result.list);
  //       });
  //   }
  // }

  //
  const search = (e) => {
    if (e.key === "Enter") {
      FetchWeather(query);
      FetchFrorcastWeather(query);
    }
  };

  const FetchWeather = (query) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
      .catch((e) => console.log(e));
  };
  const FetchFrorcastWeather = (query) => {
    fetch(`${api.base}forecast?q=${query}&cnt=16&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather1(result.list);
        setQuery("");
        console.log(result);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {}, []);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const windDirection = (degree) => {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                ></img>
              </div>

              <div className="temp">{Math.round(weather.main.temp)}°c</div>

              <div className="weather">{weather.weather[0].main}</div>
            </div>
            {/*这个地方 */}
            <div className="forecast">
              {weather1.map((temp, i) => (
                <div key={i}>
                  <div className="forecast-time">
                    <h5 className="forecast-title">{temp.dt_txt}</h5>
                  </div>

                  <div className="forecast-img">
                    <img
                      src={`https://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    ></img>
                  </div>

                  <div className="forecase-temp">
                    <h5 className="forecast-text">
                      {Math.round(temp.main.temp / 10)}°c
                    </h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="description">
              <h6>
                {" "}
                Todady: {weather.weather[0].description} currently. The highest
                temperature will be {Math.round(weather.main.temp_max)}°c. The
                lowest temperature tonight will be{" "}
                {Math.round(weather.main.temp_min)}°c.
              </h6>
            </div>

            <div className="time">
              <div className="sunrise">
                <p className="time-title">SUNRISE</p>
                <h6 className="time-text">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </h6>
              </div>
              <div className="sunset">
                <p className="time-title">SUNSET</p>
                <h6 className="time-text">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </h6>
              </div>
            </div>

            <div className="rain">
              <div className="cloud">
                <p className="cloud-title">CLOUDNESS</p>
                <h6 className="cloudness-text">{weather.clouds.all}%</h6>
              </div>
              <div className="humid">
                <p className="humidity-title">HUMIDITY</p>
                <h6 className="humidity-text">{weather.main.humidity}%</h6>
              </div>
            </div>

            <div className="wind">
              <div className="wind-speed">
                <p className="wind-title">WIND</p>
                <h6 className="wind-text">
                  {windDirection(weather.wind.deg)} {weather.wind.speed} km/hr
                </h6>
              </div>
              <div className="feel">
                <p className="feel-title">HUMIDITY</p>
                <h6 className="feel-text">{weather.main.feels_like}°c</h6>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default App;
