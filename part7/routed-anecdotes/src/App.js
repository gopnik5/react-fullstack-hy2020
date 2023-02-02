import { useState } from 'react'
import { useField } from './hooks'

import {
  Link,
  Routes,
  Route,
  useParams,
  useNavigate  
} from "react-router-dom"


const padding = {
  paddingRight: 5
}

const Menu = ({anecdotes, addNew, notification, displayNotification}) => {

  return (
    <div>
      <div>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/createNew'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>
      <div style={{color: 'red'}}>{notification}</div>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/createNew' element={<CreateNew addNew={addNew} displayNotification={displayNotification}/>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/anecdote/:id' element={<Anecdote anecdotes={anecdotes}/>}></Route>
      </Routes>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>

    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} > <Link style={padding} to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>

  </div>
)

const Anecdote = ({anecdotes}) => {
    const id = Number(useParams().id)
    const anecdote = anecdotes.find(a => a.id === id)

    return (
      <div>
       <h2>{anecdote.content}</h2>
       has {anecdote.votes} <br/><br/>
       for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>

    )

}




const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  /*
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  */

  const navigate = useNavigate()
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()

    const content = e.target.content.value
    const author = e.target.content.value
    const info = e.target.info.value

    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    navigate('/')
    props.displayNotification(`A new anecodote ${content} created!`)
    setTimeout(() => props.displayNotification(''), 5000)
  }

  const resetForm = (e) =>{
    e.preventDefault()    
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input   
            name="content"     
            type={contentField.type}
            value={contentField.value}
            onChange={contentField.onChange}        
          />          

        </div>
        <div>
          author
          <input 
            name="author"                    
            type={authorField.type}
            value={authorField.value}
            onChange={authorField.onChange}           
          />  
        </div>
        <div>
          url for more info
          <input 
            name="info"                      
            type={infoField.type}
            value={infoField.value}
            onChange={infoField.onChange}           
          />  
        </div>
        <button>create</button>
        <button onClick={(e)=>resetForm(e)}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} notification={notification} displayNotification={setNotification}/><br/>      
      <Footer />
    </div>
  )
}

export default App
