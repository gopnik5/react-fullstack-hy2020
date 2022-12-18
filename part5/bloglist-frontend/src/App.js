import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }

    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])


  const createBlog = async newObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(newBlog));
      displayMessage('Created new blog!');
    }
    catch (exception) {
      console.log("Couldn't create new blog", exception)
      displayMessage('Could not create a new blog!', 'error');
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.loginUser({ userName, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUserName('')
      setPassword('')
    }
    catch (exception) {
      displayMessage('Wrong credentials!', 'error');
    }

  }


  const displayMessage = (text, type) => {
    setMessage({ text, type })

    setTimeout(() => setMessage(null), 5000)

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
    setUser(null)

  }

  const like = (id) => {
    blogService.like(id)
      .then(() => {
        setBlogs(
          blogs.map((blog) => blog.id === id ? { title: blog.title, author: blog.author, url: blog.url, token: blog.token, id: blog.id, likes: ++blog.likes, original: blog.original } : blog)
        )
      })


  }

  const remove = (id) => {
   if(window.confirm(`Are you sure you want to remove blog ${blogs.find(blog => blog.id === id).title}?`)){
    blogService.remove(id)
    .then(() =>{
      displayMessage('The blog has been deleted', 'success');
      setBlogs(blogs.filter(blog => blog.id !== id))
    })
    .catch(error => { 
      displayMessage('Could not delete the blog!', 'error');
    })  
   }

  }


  const blogFormRef = useRef()
  if (user === null) {
    return (
      <div><br />
        <Notification message={message} /><br />
        {loginForm}
      </div>
    )
  }


  return (
    <div>
      <h2>Blogs</h2><br />
      <Notification message={message} /><br />
      {user.userName} is logged in &nbsp;&nbsp; <button onClick={handleLogout}>Logout</button>
      <p />
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <p />
      {
        blogs.sort((a, b) => b.likes - a.likes
        ).map(blog =>
          <Blog key={blog.id} blog={blog} like={like} remove={remove}/>
        )
      }
    </div>

  )




}

export default App
