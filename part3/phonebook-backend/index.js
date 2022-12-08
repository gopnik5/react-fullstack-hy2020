const express = require('express')
const cors = require('cors')

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const app = express()
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })



app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people <br/> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person =>person.id === id)
    if(!person){
        res.status(404).end()
    }
    else {
        res.json(person);
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person =>person.id !== id)

    res.status(204).end()

})

const generateNewId = () => Math.floor(Math.random() * (500000 - 10) + 10)

const validate = (person) => {
        if(!person.name){
            return 'The name is missing'
        }
        else if(!person.number){
            return 'The number is missing'
        }
        else if(persons.find(p => p.name === person.name)){
            return 'name must be unique'
        }
        return null;

}

app.post('/api/persons/', (req, res) => {

    let newPerson = req.body;
    
    let message = validate(newPerson); 

    if(message){
        return res.status(400).json({error: message})        
    }
    newPerson.id = generateNewId();

    persons = persons.concat(newPerson);
    res.json(newPerson);


})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})