import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"


import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { displayNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setLoggedInUser } from './reducers/loginReducer'
import UserDetails from './components/UserDetails'
import Blogs from './components/Blogs'




const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  
  
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => {
        console.log('state', state)
        return state.user
      }
    )
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(setLoggedInUser(JSON.parse(loggedUserJSON)));
    }

    blogService.getAll().then(blogs => {
      console.log('received blogs:', blogs)
      //setBlogs(blogs)
      dispatch(setBlogs(blogs))
    })
  }, [])


  const createBlog = async newObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(newObject)
      //setBlogs(blogs.concat(newBlog));
      dispatch(setBlogs(blogs.concat(newBlog)))
      displayMessage('Created new blog!');
    }
    catch (exception) {
      console.log("Couldn't create new blog", exception)
      displayMessage('Could not create a new blog!', 'error');
    }
  }

  const  addComment = async (id, comment)=>{


    try{
      await blogService.addComment(id, comment)



      const newBlogs = [...blogs]
      const blog = newBlogs.find((blog => blog.id === id))
      blog.comments.push(comment)

      dispatch(setBlogs(newBlogs))
      displayMessage('Added new comment!'); 
 
    }
    catch (exception){
      console.log("Couldn't add comment", exception)  
      displayMessage('Could not add new comment!', 'error');  
    }
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.loginUser({ userName, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      dispatch(setLoggedInUser(user))
      setUserName('')
      setPassword('')
    }
    catch (exception) {
      displayMessage('Wrong credentials!', 'error');
    }

  }


  const displayMessage = (text, type) => {
    
    dispatch(displayNotification({text, type}))
    

    setTimeout(() => dispatch(displayNotification(null)), 5000)

  }


  const loginForm =
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        User Name: <input type="text" name="userName" value={userName} onChange={({ target }) => setUserName(target.value)} /><br /><br />
        Pasword:  <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLoggedInUser(null))

  }

  const like = (id) => {
    blogService.like(id)
      .then(() => {
        dispatch(setBlogs(
          blogs.map((blog) => blog.id === id ? { title: blog.title, author: blog.author, url: blog.url, token: blog.token, id: blog.id, likes: ++blog.likes, original: blog.original } : blog)
        ))
      })


  }

  const remove = (id) => {
   if(window.confirm(`Are you sure you want to remove blog ${blogs.find(blog => blog.id === id).title}?`)){
    blogService.remove(id)
    .then(() =>{
      displayMessage('The blog has been deleted', 'success');
      dispatch(setBlogs(blogs.filter(blog => blog.id !== id)))
    })
    .catch(error => { 
      displayMessage('Could not delete the blog!', 'error');
    })  
   }

  }


  const Menu = ()=>{

    const padding = {
      padding: 5
    }

    return (
      <div style={{backgroundColor: 'lightblue'}}>
        <Link style={padding} to="/">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
      </div>
    )

  }

  const blogFormRef = useRef()
  if (user === null) {
    return (
      <div className="container"><br />
        <Notification /><br />
        {loginForm}
      </div>
    )
  }


  return (
    <div className="container">
      <h2>Blogs</h2>

      <Router>      
      <Menu />
      <Notification /><br />


      {user.userName} is logged in &nbsp;&nbsp; <button onClick={handleLogout}>Logout</button>
        <p />
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <p />

        <Routes>
            <Route path="/userDetails/:userName" element={<UserDetails blogs={blogs}/>} /> 
            <Route path="/users" element={<Users/>} /> 
            <Route path="/" element={<Blogs blogs={blogs} />} /> 
            <Route path="/blog/:id" element={<Blog blogs={blogs} like={like} remove={remove} addComment={addComment}/>} />             
        </Routes>        
      </Router>


    </div>

  )




}

export default App
