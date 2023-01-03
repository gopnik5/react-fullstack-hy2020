import { createSlice } from '@reduxjs/toolkit'




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload
      return state.map(obj => obj.id !== id? obj : {...obj, votes: obj.votes + 1})
    },
    createAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})


export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*
export const createVoteAction = id => ({type: 'VOTE', data: {id}})
export const createNewAction = content => ({type: 'NEW', data: {content}}) 


const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE': 
      const id = action.data.id
      return state.map(obj => obj.id !== id? obj : {...obj, votes: obj.votes + 1})
    case 'NEW':
      return [...state, {content: action.data.content, id: getId(), votes: 0}]

    default:
      return state
  }



}

export default reducer
*/