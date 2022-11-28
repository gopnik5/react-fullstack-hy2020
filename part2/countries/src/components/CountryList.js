const CountryList = ({countries}) => {


    return (

        countries.map(country => <div key={country}>{country}</div> )

    )



}

export default CountryList