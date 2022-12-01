const Persons = ({persons, deletePerson}) => 
    persons.map((person) => <div key={person.name}>{person.name} {person.number} &nbsp;
                            <button onClick={() => deletePerson(person)}>delete</button></div>)



export default Persons