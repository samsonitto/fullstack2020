import React, { useState } from 'react'
import TextLine from './TextLine'
import CountryInfo from './CountryInfo'
import Button from './Button'

const CountryList = (props) => {

    const handleOnClick = (countryName) => {
        props.getCountryInfo(countryName);
    }

    if(props.countries.length > 10){
        return (
            <TextLine text={'Too many matches, be more specific'} />
        )
    }
    else if (props.countries.length === 1) {        
        return (
            <CountryInfo weather={props.weather} countries={props.countries} />
        )
    }
    return (
        <>
            {props.countries.map((country, i) =>
                <div key={i}>
                    {country.name} <Button text={'Show'} handleOnClick={() => handleOnClick(country.name)} />
                </div>
            )}
        </>
    )
}

export default CountryList