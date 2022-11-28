import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])

  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  */

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.find(person => person.name === newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  
  const filteredPersons = filter ? persons.filter((person) => {
    console.log("filter: " + filter);
    return person.name.toLowerCase().includes(filter.toLocaleLowerCase())
 
  }) : persons





  return (
    <div style={{ marginLeft: '10px' }}>

      <h2>Phonebook</h2>
      <Filter onChange={(event) => setFilter(event.target.value)} value={filter}/>
      <h3>Add a new</h3>

      <PersonForm onChange={{name: (event) => setNewName(event.target.value), number: (event) => setNewNumber(event.target.value)}}
                  value={{name: newName, number: newNumber}} onSubmit={addPerson}
        
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App