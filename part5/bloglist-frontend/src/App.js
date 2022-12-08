import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('') 
  const [newURL, setNewURL] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      setUser(JSON.parse(loggedUserJSON));
    }

    blogService.getAll().then(blogs =>{
      setBlogs( blogs)
  })  
  }, [])


  const create = async (event)=>{
    event.preventDefault()
    try{
      const newBlog = await blogService.create({title: newTitle, author: newAuthor, url: newURL})
      setBlogs(blogs.concat(newBlog));
      setNewTitle('')
      setNewAuthor('')
      setNewURL('')      
    }
    catch (exception){
      console.log("Couldn't create new blog", exception)
      alert("Couldn't create new blog", exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.loginUser({userName, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUserName('')
      setPassword('')
    }
    catch(exception){
      alert('wrong credentials');
    } 

  }

  const loginForm = 
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      User Name: <input type="text" name="userName" value={userName}  onChange={({target})=>setUserName(target.value)}/><br/><br/>
      Pasword:  <input type="password" name="password" value={password}  onChange={({target})=>setPassword(target.value)}/><br/><br/> 
      <button type="submit">Login</button> 
    </form>
  </div>


  const createForm =
  <div>
    <h2>Create new</h2>
    <form onSubmit={create}>
      Title <input type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)} /><br/><br/>
      Author <input type="text" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/><br/><br/>
      URL <input type="text" value={newURL} onChange={({target}) => setNewURL(target.value)}/><br/><br/>
      <button type="submit">Create</button>

    </form>


  </div>

const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)

}
    
  if(user === null) {
    return loginForm 
  } 
  
  return (
    <div>
      <h2>Blogs</h2>
      {user.userName} is logged in &nbsp;&nbsp; <button onClick={handleLogout}>Logout</button>
      <p/>
      {createForm}
      <p/>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>

  )

    
   
  
}

export default App
