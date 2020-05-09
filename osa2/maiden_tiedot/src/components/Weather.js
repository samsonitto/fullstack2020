import React, { useState, useEffect } from 'react'
import Header from './Header'
import TextLine from './TextLine'
import axios from 'axios'

const Weather = (props) => {
    const [weather, setWeather] = useState({})
    const [weatherLoaded, setWeatherLoaded] = useState(false)

    useEffect(() => {
        console.log('effect')
        const search = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${props.city}`

        axios
          .get(search)
          .then(response => {
            console.log('promise fulfilled')
            setWeatherLoaded(true)
            setWeather(response.data)
            console.log(response.data.current.temperature);
            
          })
        
      }, [])
    
    if(Object.keys(weather).length !== 0 && weather.constructor === Object){
        console.log(weather);
        
        return (
            <>
                <Header text={`Weather in ${weather.location.name}`} />
                <TextLine text={`Temperature: ${weather.current.temperature} Celcius`} />
                    <img src={weather.current.weather_icons[0]} />
                <TextLine text={`Wind: ${weather.current.wind_speed}, Direction: ${weather.current.wind_dir}`} />
            </>
        )
    }
    return (
        <>
            
        </>
    )
}

export default Weather