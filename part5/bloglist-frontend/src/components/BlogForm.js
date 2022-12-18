import { useState } from "react"

const BlogForm = ({createBlog}) => {
 
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('') 
    const [newURL, setNewURL] = useState('')


    const create = (event) => {
        event.preventDefault()

        createBlog({title: newTitle, author: newAuthor, url: newURL})

        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        
    }
 
    return (
    <div>
        <h2>Create new</h2>
        <form onSubmit={create}>
            Title <input type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)} /><br/><br/>
            Author <input type="text" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/><br/><br/>
            URL <input type="text" value={newURL} onChange={({target}) => setNewURL(target.value)}/><br/><br/>
            <button type="submit">Create</button>

        </form>
    </div>
    )
}

export default BlogForm