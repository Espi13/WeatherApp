import React from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';

import './styles.css';

 const renderForecastItemDays = (forecastData) => {
    return forecastData.map(forcast => 
        <ForecastItem 
            weekDay={forcast.weekDay} 
            key = {`${forcast.weekDay}${forcast.hour}`} 
            hour={forcast.hour} 
            data = {forcast.data}
        />
    )

}
const renderProgress = () => {
    return "Cargando pronostico extendido"
}


const  ForecastExtended = ({ city, forecastData }) =>  (
    <div>
        <h3 className = "forcast-title"> Pronostico Extendido para {city} </h3>
        {forecastData ? renderForecastItemDays(forecastData) : renderProgress()}
    </div>
)

ForecastExtended.propTypes = {
    city:PropTypes.string.isRequired,
    forecastData:PropTypes.array.isRequired,
}

export default ForecastExtended;