import React, { Component } from 'react';
import styled from 'styled-components';
import MediumLabel from './labels/MediumLabel';

const FavouritesWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const StyledButton = styled.button`
  color: white;
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  height: 3rem;
  border: 2px solid #0072ff;
  box-shadow: 0.25rem 0.25rem 1rem hsla(0, 0%, 0%, 0.10);
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
      background: rgba(0, 45,	222, 0.5);
      
    `;
    }
  }}

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 2px solid white;
    outline: none;
    background: rgba(66, 154, 212, 0.5);
  }

  &:focus {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    outline: none;
    background: rgba(56, 134, 229, 0.5);
  }
`;

class Favourites extends Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);
  }

  getWeather(event) {
    this.props.callBackFromParent(event.target.value);
  }

  render() {
    let cityElements = this.props.savedCities.map(city => {
      return (
        <StyledButton value={city} key={`${city}-button`} onClick={this.getWeather} content={city}>
          {city}
        </StyledButton>
      );
    });

    return (
      <FavouritesWrapper>
        <MediumLabel weight="400">Favourites ({cityElements.length}/5)</MediumLabel>
        <div>{cityElements}</div>
      </FavouritesWrapper>
    );
  }
}

export default Favourites;
