import React from 'react';
import WeatherIcons from 'react-weathericons';
import PropTypes from 'prop-types';
import {  CLOUD,  SUN, RAIN, SNOW, THUNDER,DRIZZLE } from '../../../constants/weather';
import './styles.css';
const icons = {
    [CLOUD]:"cloud",
    [SUN]: "day-sunny",
    [RAIN]: "rain",
    [SNOW]: "snow",
    [THUNDER]: "day-thunderstorm",
    [DRIZZLE]: "day-showers"
}

const getWeatherIcon = weatherState => {
    const icon = icons[weatherState];

    const sizeIcons = "3x";

    if(icon)
        return <WeatherIcons className="wicon" name = {icon} size = {sizeIcons} />
    else 
        return <WeatherIcons className="wicon" name = {"day-sunny"} size = {sizeIcons} />
}

const WeatherTemperature = ({temperature,weatherState}) => (
    <div className="weatherTemperatureCont">
        {
            getWeatherIcon(weatherState)
        }
        <span className = "temperature">{`${temperature}`}</span>
        <span className = "temperatureType">{"Cº"}</span>

    </div>
);

WeatherTemperature.protoTypes = {

    temperature: PropTypes.number.isRequired,
    weatherState: PropTypes.string.isRequired

};

export default WeatherTemperature