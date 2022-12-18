import { useState } from "react"

const Blog = ({blog, like, remove}) => {

    const [hide, setHide] = useState(true)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const noDetails = <div>{blog.title}  &nbsp;  <button onClick={() => setHide(!hide)}>{hide? 'view' : 'hide'}</button></div>
    const details = <div>
                      <div>{blog.title} &nbsp; <button onClick={() => setHide(!hide)}>{hide? 'view' : 'hide'}</button></div>
                      <div>{blog.url}</div>
                      <div>likes {blog.likes} &nbsp; <button onClick={() => like(blog.id)}>like</button></div>
                      <div>{blog.author}</div>
                      {blog.original? '' : <div><button style={{color: 'red'}} onClick={() => remove(blog.id)}>Remove</button></div>}
                    </div>  
    
  return (
    <div style={blogStyle}>
      {hide? noDetails: details} 
    </div>  
  )

}
export default Blog