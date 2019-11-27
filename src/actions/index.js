
import transformForecast from '../services/transformForecast'
import transformWeather from '../services/transformWeather'

export const SET_CITY = 'SET_CITY' 
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA'

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY'
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY'
 
const setCity = payload => ({type : SET_CITY, payload});

const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload})

const getWeatherCity = payload => ({ type:GET_WEATHER_CITY, payload })
const setWeatherCity = payload => ({ type:SET_WEATHER_CITY, payload })

const api_key = "f99bbd9e4959b513e9bd0d7f7356b38d";
const url_base_forecast ="http://api.openweathermap.org/data/2.5/forecast"
const url_base_weather ="http://api.openweathermap.org/data/2.5/weather"

export const setSelectedCity = payload => {
    return (dispatch, getState) => {
        const url_forecast = `${url_base_forecast}?q=${payload}&appid=${api_key}`;

        dispatch(setCity(payload));
        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;
        const now = new Date();
        if (date && (now - date < 1 * 60 * 1000)){
            return;
        }
        return fetch(url_forecast)
            .then(res => res.json()) 
                .then(
                    weather_data => {
                        const forecastData = transformForecast(weather_data);

                        dispatch(setForecastData({city: payload, forecastData}))
                    }
                )
    };
};

export const setWeather =  payload => {

    return dispatch => {
        payload.forEach(city => {
            dispatch(getWeatherCity(city));
            const api_weather = `${url_base_weather}?q=${city}&appid=${api_key}`;
            fetch(api_weather)
                .then(res => {
                    return res.json();
                })
                    .then( data=> {
                        const weather = transformWeather(data);
                        dispatch(setWeatherCity({city,weather}))
                })
        });
    }
}