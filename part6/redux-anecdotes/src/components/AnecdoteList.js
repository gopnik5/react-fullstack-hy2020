import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const filter = useSelector(state => state.filter)
  const anecdotes = [...useSelector(state => state.anecdotes)].filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted ${anecdotes.find(anecdote => anecdote.id === id).content}`)) 
    setTimeout(() => dispatch(removeNotification()), 5000)
  }


  
  return (
    <div>
      {anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            &nbsp;<button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default AnecdoteList