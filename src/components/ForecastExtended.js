import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import transformForecast from '../services/transformForecast';
import './styles.css';

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url_base_weather ="http://api.openweathermap.org/data/2.5/forecast"

class ForecastExtended extends Component { 

    constructor(){
        super();
        this.state = {forecastData: null}
    }
    
    componentDidMount() {
        this.updateCity(this.props.city)
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city){
            this.setState({forecastData: null});
            this.updateCity(nextProps.city)
        }
    }
    
    updateCity = city => {
        const url_forecast = `${url_base_weather}?q=${city}&appid=${api_key}`;
        fetch(url_forecast)
            .then(res => res.json()) 
                .then(
                    weather_data => {
                        console.log(weather_data);
                        const forecastData = transformForecast(weather_data);
                        console.log(forecastData)
                        this.setState({ forecastData });
                    }
                )  
    }
    renderForecastItemDays(forecastData){
        return forecastData.map(forcast => 
            <ForecastItem 
                weekDay={forcast.weekDay} 
                key = {`${forcast.weekDay}${forcast.hour}`} 
                hour={forcast.hour} 
                data = {forcast.data}
            />
        )

    }
    renderProgress(){
        return "Cargando pronostico extendido"
    }
    render(){
        const  city  = this.props.city
        const { forecastData } = this.state
        return(
            <div>
                <h3 className = "forcast-title"> Pronostico Extendido para {city} </h3>
                {forecastData ? this.renderForecastItemDays(forecastData) : this.renderProgress()}
            </div>
        )
    }
}

ForecastExtended.propTypes = {
    city:PropTypes.string.isRequired,
}

export default ForecastExtended;