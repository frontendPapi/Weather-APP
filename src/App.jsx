import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("Skopje");
  const [data, setData] = useState({});
  const [cityData, setCityData] = useState('')

  const doFetch = useCallback(async () => {
    console.log('here', cityName)
    await axios
      .get(
        // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${"0293d762927c3ac3a2d4dc21acb9f6c2"}`
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${"0293d762927c3ac3a2d4dc21acb9f6c2"}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cityName]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const handleChange = (e) => {
    setCityData(e)
  }

  const handleClick = () => {
    setCityName(cityData)
  }

  if (data && data.weather) {

    return (
      <div className="app">
        <div className="search">
          <input placeholder="Enter location" type="text" value={cityData} onChange={(e)=> handleChange(e.target.value)} />
          <button onClick={()=>handleClick()} style={{width: '100px', height: '30px'}}>Search</button>
        </div>
        <div className="container">
          <div className="top">
            <div className="location bold">
              <p>{data.name}</p>
            </div>
            <div className="temp bold">
              {data.main.temp ? (
                <h1>{Math.floor(data.main.temp)}&#176;</h1>
              ) : null}
            </div>
            <div className="description bold">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="bottom">
            <div className="feels bold">
              {data.main ? (
                <p>{Math.floor(data.main.feels_like)}&#176;</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity bold">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind bold">
              {data.wind ? <p>{Math.floor(data.wind.speed)}km</p> : null}
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
