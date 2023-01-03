import {useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'




const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const create = async event =>{
        event.preventDefault()
        const value = event.target.newAnecdote.value
        const newAnecdote = await anecdoteService.createNew(value)      
        dispatch(createAnecdote(newAnecdote))
        event.target.newAnecdote.value = ''

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name='newAnecdote'/></div>
            <button type='submit'>create</button>
            </form>
        </div>

    )

}

export default AnecdoteForm