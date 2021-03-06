import React from 'react'
import Header from './Header'
import TextLine from './TextLine'
import Weather from './Weather'

const CountryInfo = (props) => {

        return (
            <>
                {props.countries.map((country, i) => 
                    <div key={i}>
                        <Header type={'h1'} text={country.name} />
                        <TextLine text={`Capital: ${country.capital}`} />
                        <TextLine text={`Population: ${country.population}`} />
    
                        <Header text={'Languages'} />
                        {country.languages.map((lang, langIndex) => <li key={lang.iso639_1 + toString(langIndex)}>{lang.name}</li>)}
                        <br /><img alt={`Flag of ${country.name}`} src={country.flag} style={{width:200, border:'1px solid black'}} />
    
                        <Weather city={country.capital} />
                        
                    </div>
                )}
                
            </>
        )
    
    
}

export default CountryInfo