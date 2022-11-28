const CountryList = ({countries}) => {

    //response.data.map(country => country.name.common


    let display = countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
    if(countries.length > 10){
        display = <div>Too many matches, specify another filter</div>
    }
 
    else if(countries.length === 1){
        let country = countries[0]
        let name = country.name.common
        let capital = country.capital
        let area = country.area
        let flags = country.flags
        let languages = Object.entries(country.languages);

        Object.keys(languages)
        display = 
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
    }

    return (

        <div>
            {display}
        </div>        

    )



}

export default CountryList