import { useParams } from "react-router-dom"
import { useState } from "react"



const Blog = ({blogs, like, remove, addComment}) => {

  const [newComment, setNewComment] = useState('')

  const id = Number(useParams().id)
  console.log('got id', id)

  console.log('passed blogs', blogs)
  const blog = blogs.find(blog => blog.id === id)
  console.log('found blog', blog, )

  
  const addNewComment = () =>{

    addComment(id, newComment)
    setNewComment('')
  }
  


  if(!blog){
    return null
  }

  return (
        <div>
          <div>{blog.title}</div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} &nbsp; <button onClick={() => like(blog.id)}>like</button></div>
          <div>{blog.author}</div>
          {blog.original? '' : <div><button style={{color: 'red'}} onClick={() => remove(blog.id)}>Remove</button></div>}
          <p/>
          <h3>Comments:</h3>
          <div><input type="text" name="newComment" value={newComment} onChange={(event)=>setNewComment(event.target.value)} style={{float:'left'}}/>&nbsp;
          <button style={{float:'left'}} onClick={addNewComment}>add comment</button></div>
          <div>
          <ul>
            {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
          </div>
        </div>  
  )

}
export default Blog