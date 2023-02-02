import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"
  


const Users = () =>{


    const blogs = useSelector(state => state.blogs)
    const authors = []

    const process = (blog) => {
        const author = authors.find((author) => author.name === blog.author)
        if(author){
            author.blogsCreated++
        }
        else{
            authors.push({name:blog.author, blogsCreated: 1})
        }

    }

    blogs.forEach(blog => {
        process(blog)
    });



    return (
    <div>
        <div>
            <h2>Users:</h2>

                <table>
                    <thead><tr><th></th><th>blogs created</th></tr></thead>
                    <tbody>
                    {
                    authors.sort((a, b) => b.blogsCreated - a.blogsCreated)
                        .map((author, index) => 
                        {
                            return <tr key={index}><td><Link to={`/userDetails/${author.name}`}>{author.name}</Link></td><td>{author.blogsCreated}</td></tr>
                        }
                        )
                    }
                    </tbody>
                </table>               
        </div>
    </div>
    )
    
}

export default Users