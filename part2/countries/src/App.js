import { useEffect, useState } from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import CountryList from './components/CountryList'


function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);


  useEffect(() =>{
      axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //setAllCountries(response.data.map(country => country.name.common));
        setAllCountries(response.data);
        console.log('running effect')
      })
  },[]) 

  const onChange = (event) => {

    setCountries(allCountries.filter((country)=>country.name.common.toUpperCase().includes(event.target.value.toUpperCase())))
    setFilter(event.target.value)

  }

  return (
    <div>
      <Filter onChange={onChange} value={filter}/>
      <CountryList countries={countries}/>
    </div>
  );
}

export default App;
