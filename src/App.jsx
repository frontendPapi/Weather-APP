import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cordinates, setCordinates] = useState({
    lat: "41.99646",
    lon: "21.43141",
  });
  const [data, setData] = useState({});

  const doFetch = useCallback(async () => {
    const { lat, lon } = cordinates;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"0293d762927c3ac3a2d4dc21acb9f6c2"}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cordinates]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    doFetch();
  }, [doFetch, cordinates.lat, cordinates.lon]);

  if (data && data.weather) {
    console.log(data);

    return (
      <div className="app">
        <div className="search">
          <input placeholder="Enter location" type="text" />
        </div>
        <div className="container">
          <div className="top">
            <div className="location bold">
              <p>{data.name}</p>
            </div>
            <div className="temp bold">
              {data.main.temp ? <h1>{data.main.temp}&#176;</h1> : null}
            </div>
            <div className="description bold">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels bold">
              {data.main ? <p>{data.main.feels_like}&#176;</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity bold">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind bold">
              {data.wind ? <p>{data.wind.speed}km</p> : null}
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default App;
