import { useState } from "react"

const CountryList = ({countries}) => {


    const [shownCountry, setShownCountry] = useState(null)


    const getDetails = (country) =>{

        if(!country){
            return '';
        }
        let name = country.name.common
        let capital = country.capital
        let area = country.area
        let flags = country.flags
        let languages = Object.entries(country.languages);

        return (
            <div>
                <br/><br/>
                <div style={{fontWeight: 'bold', fontSize: '25px'}}>{name}</div>
                <br/>
                <div>Capital: {capital}</div>
                <div>Area: {area}</div>
                <br/><br/>
                <div style={{fontWeight: 'bold'}}>languages:</div>
                <ul>
                    {languages.map(language => <li key={language[1]}>{language[1]}</li>)}
                </ul>
                <img src={flags.png} alt="flag" />
            </div>
        )        
    }        

    if(countries.length > 10){
        return <div>Too many matches, specify another filter</div>
    }
 
    else if(countries.length === 1){
        return getDetails(countries[0])
    }
    else{
        return (

            <div>
                {countries.map(country => <div key={country.name.common}>{country.name.common}&nbsp;
                <button onClick={() => {setShownCountry(country)}}>Show</button></div>)}
               {getDetails(shownCountry)}

            </div>        

        )
    }



}

export default CountryList