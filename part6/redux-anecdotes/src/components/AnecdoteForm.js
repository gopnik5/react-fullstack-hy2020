import {useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const create = event =>{
        event.preventDefault()
        const value = event.target.newAnecdote.value
        dispatch(createAnecdote(value))
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