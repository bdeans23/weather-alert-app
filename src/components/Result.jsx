import React, { Component } from 'react';
import './Result.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import device from '../responsive/Device';
import ForecastHour from './ForecastHour';
import ResultFadeIn from './ResultFadeIn';
import BigLabel from './labels/BigLabel';
import MediumLabel from './labels/MediumLabel';
import SmallLabel from './labels/SmallLabel';
import Text from './Text';
import DegreesToCardinal from './Wind';

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div``;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(220, 220, 220, 0.2);
  box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;

const StyledButton = styled.button`
  color: white;
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  border: 2px solid #0072ff;
  box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.1);
  vertical-align: middle;

  ${props => {
    if (props.saveButton) {
      return `
        background: #21ba45;
    `;
    }
    if (props.deleteButton) {
      return `
        background: #ca1010;
    `;
    } else {
      return `
        background: transparent;
    `;
    }
  }}

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 2px solid white;
    outline: none;
  }
`;

class Result extends Component {
  constructor(props) {
    super(props);
    this.saveDataToLocalStorage = this.saveDataToLocalStorage.bind(this);
    this.deleteDataFromLocalStorage = this.deleteDataFromLocalStorage.bind(this);
  }

  deleteDataFromLocalStorage() {
    const existingCities = JSON.parse(localStorage.getItem('cityList'));
    const indexOfCity = existingCities.indexOf(
      `${this.props.weatherData.city}, ${this.props.weatherData.country}`,
    );

    existingCities.splice(indexOfCity, 1);
    localStorage.setItem('cityList', JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  saveDataToLocalStorage() {
    const existingCities = JSON.parse(localStorage.getItem('cityList')) || [];
    existingCities.push(`${this.props.weatherData.city}, ${this.props.weatherData.country}`);
    localStorage.setItem('cityList', JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  render() {
    const {
      city,
      country,
      date,
      description,
      main,
      temp,
      sunset,
      sunrise,
      wind,
      windDirection,
      highestTemp,
      lowestTemp,
      forecast,
    } = this.props.weatherData;

    const forecasts = forecast.map(item => (
      <ForecastHour
        key={item.dt}
        temp={Math.floor(item.main.temp * 1) / 1}
        icon={item.weather[0].icon}
        month={item.dt_txt.slice(5, 7)}
        day={item.dt_txt.slice(8, 10)}
        hour={item.dt_txt.slice(11, 13) * 1}
        wind={item.wind}
      />
    ));

    const saveBtn = (
      <StyledButton saveButton onClick={this.saveDataToLocalStorage}>
        Save to favourites
      </StyledButton>
    );
    const deleteBtn = (
      <StyledButton deleteButton onClick={this.deleteDataFromLocalStorage}>
        Delete from favorites
      </StyledButton>
    );
    const existingCities = this.props.savedCities;
    const searchTerm = `${city}, ${country}`;

    let weatherIcon = null;

    if (main === 'Thunderstorm') {
      weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (main === 'Drizzle') {
      weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (main === 'Rain') {
      weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (main === 'Snow') {
      weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (main === 'Clear') {
      weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (main === 'Clouds') {
      weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
      weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

    return (
      <Results>
        <LocationWrapper>
          <BigLabel>
            {city}, {country}
            {existingCities.includes(searchTerm) ? deleteBtn : undefined}
            {existingCities.length !== 5 && !existingCities.includes(searchTerm)
              ? saveBtn
              : undefined}
          </BigLabel>
          <SmallLabel weight="400">{date}</SmallLabel>
        </LocationWrapper>
        <CurrentWeatherWrapper>
          <WeatherIcon>{weatherIcon}</WeatherIcon>
          <TemperatureWrapper>
            <Temperature>{Math.floor(temp)}&#176;</Temperature>
            <SmallLabel weight="400" firstToUpperCase>
              {description}
            </SmallLabel>
          </TemperatureWrapper>
        </CurrentWeatherWrapper>
        <WeatherDetailsWrapper>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {Math.floor(highestTemp)}&#176;
            </SmallLabel>
            <Text align="center">High</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {DegreesToCardinal(windDirection)}
            </SmallLabel>
            <Text align="center">Wind direction</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {sunrise}
            </SmallLabel>
            <Text align="center">Sunrise</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {Math.floor(lowestTemp)}&#176;
            </SmallLabel>
            <Text align="center">Low</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {wind}mph
            </SmallLabel>
            <Text align="center">Wind speed</Text>
          </WeatherDetail>
          <WeatherDetail>
            <SmallLabel align="center" weight="400">
              {sunset}
            </SmallLabel>
            <Text align="center">Sunset</Text>
          </WeatherDetail>
        </WeatherDetailsWrapper>
        <ForecastWrapper>
          <MediumLabel weight="400">5 Day Forecast</MediumLabel>
          <Forecast>{forecasts}</Forecast>
        </ForecastWrapper>
      </Results>
    );
  }
}

export default Result;
