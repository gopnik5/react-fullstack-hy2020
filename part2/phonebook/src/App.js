import { useState, useEffect } from 'react'
import './index.css'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])


  useEffect(() => {
    phonebookService.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({text: null, isError: false})

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName)
    if (!existingPerson) {
      phonebookService.create({ name: newName, number: newNumber })
      .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setMessage({text: 'Added ' + newPerson.name, isError: false})
            setTimeout(() => setMessage({text: null, isError: false}), 3000)
            }
      
      )
      
      setNewName('')
      setNewNumber('')
    }
    else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        phonebookService.update({ name: newName, number: newNumber, id: existingPerson.id })
        .then(() => setPersons(persons.map(person => person.id !== existingPerson.id ? person : {...person, number: newNumber} )))
        .catch(error => {
          setMessage({text: `Information of ${newName} has already been removed from server`, isError: true})
          setTimeout(() => setMessage({text: null, isError: false}), 3000)

        })
        setNewName('')
        setNewNumber('')        

      }
    }

  }

  
  const filteredPersons = filter ? persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLocaleLowerCase())
 
  }) : persons



  const deletePerson = (person) => {
    console.log('person to delete: ', person);
    if(window.confirm(`Are you sure you want to delete ${person.name} ?`)) {
      phonebookService.deletePerson(person.id)
      .then(
        () => {
          setPersons(persons.filter(p => p.id !== person.id))
      })
    }
}




  return (
    <div style={{ marginLeft: '10px' }}>

      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter onChange={(event) => setFilter(event.target.value)} value={filter}/>
      <h3>Add a new</h3>

      <PersonForm onChange={{name: (event) => setNewName(event.target.value), number: (event) => setNewNumber(event.target.value)}}
                  value={{name: newName, number: newNumber}} onSubmit={addPerson}
        
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={(id) => deletePerson(id)}/>

    </div>
  )
}

export default App