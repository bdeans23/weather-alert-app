import React from 'react';
import styled from 'styled-components';
import SearchCity from './components/SearchCity';
import device from './responsive/Device';
import Result from './components/Result';
import NotFound from './components/NotFound';
import Favourites from './components/Favourites';

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}
`;

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      weatherInfo: undefined,
      savedCities: [],
      hasSavedCities: false,
      error: false,
    };

    this.callWeatherInfo = this.callWeatherInfo.bind(this);
    this.updateSavedCities = this.updateSavedCities.bind(this);
  }

  callWeatherInfo(location) {
    const APIkey = import.meta.env.VITE_REACT_APP_API_KEY;
    let parsedLocation = location.replaceAll(' ', '+');

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${parsedLocation}&APPID=${APIkey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${parsedLocation}&APPID=${APIkey}&units=metric`;

    Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([weatherData, forecastData]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
        const weatherInfo = {
          city: weatherData.name,
          country: weatherData.sys.country,
          date,
          description: weatherData.weather[0].description,
          main: weatherData.weather[0].main,
          temp: weatherData.main.temp,
          highestTemp: weatherData.main.temp_max,
          lowestTemp: weatherData.main.temp_min,
          sunrise,
          sunset,
          clouds: weatherData.clouds.all,
          wind: weatherData.wind.speed,
          windDirection: weatherData.wind.deg,
          forecast: forecastData.list,
        };
        this.setState({
          weatherInfo,
          error: false,
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          error: true,
          weatherInfo: undefined,
        });
      });
  }

  updateSavedCities(cityArr) {
    // hasCities is set to true if length is more than 0, otherwise false
    const hasCities = cityArr.length > 0;
    this.setState({ savedCities: cityArr, hasSavedCities: hasCities });
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearchCity = e => {
    e.preventDefault();
    const { value } = this.state;
    this.callWeatherInfo(value);
  };

  componentDidMount() {
    // See if there's saved cities in localStorage before the App is mounted
    let existingCities = JSON.parse(localStorage.getItem('cityList') || '[]');

    if (existingCities.length !== 0) {
      this.setState({
        hasSavedCities: true,
        savedCities: existingCities,
      });
    }
  }

  render() {
    const { value, weatherInfo, error, hasSavedCities, savedCities } = this.state;

    return (
      <WeatherWrapper>
          <AppTitle secondary showResult={(weatherInfo || error) && true}>
            Weather Alert
          </AppTitle>

          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />

          {hasSavedCities && (
            <Favourites savedCities={savedCities} callBackFromParent={this.callWeatherInfo} />
          )}

          {weatherInfo && (
            <Result
              weatherData={weatherInfo}
              savedCities={savedCities}
              callBackFromParent={this.updateSavedCities}
            />
          )}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
    );
  }
}

export default App;
