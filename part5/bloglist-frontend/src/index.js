import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore,  combineReducers } from 'redux'
import { Provider } from 'react-redux'


import './index.css'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'



const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: loginReducer
  })


const store = createStore(reducer)



ReactDOM.createRoot(document.getElementById('root')).render(
 
 <Provider store={store}>
    <App />
  </Provider>

)


