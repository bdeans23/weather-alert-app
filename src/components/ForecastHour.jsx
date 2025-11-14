import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Text from './Text';
import device from '../responsive/Device';
import Arrow from '@elsdoerfer/react-arrow';
import DegreesToCardinal from './Wind';

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(220, 220, 220, 0.2);
  box-shadow: 0.25rem 0.25rem 1rem rgba(0, 0, 0, 0.1);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`;

const WindDirection = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const WeatherIcon = styled.img`
  display: block;
  height: 50px;
  width: 50px;
  margin: 0 auto;
`;

const ForecastHour = props => {
  const { month, day, hour, wind, icon, temp } = props;
  const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;

  const renderArrow = wind => (
    <Arrow
      angle={wind.deg}
      length={15}
      style={{
        width: '40px',
      }}
    />
  );

  return (
    <ForecastWrapper>
        <Text align="center">
          {day}/{month}
        </Text>
        <Text align="center">{hour}:00</Text>
        <WindDirection>{renderArrow(wind)}</WindDirection>
        <Text align="center">{DegreesToCardinal(wind.deg)}</Text>
        <Text align="center">{wind.speed}mph</Text>
        <WeatherIcon src={iconUrl} />
        <Text align="center">{temp}&#176;</Text>
      </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  temp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ForecastHour;
