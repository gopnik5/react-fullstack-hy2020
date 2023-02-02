import {
    useParams
  } from "react-router-dom"
  


const UserDetails = ({blogs}) => {

    const name = useParams().userName

    return (
        <div>    
            <h2>{name}</h2>
            <h3>Added blogs:</h3>
            <div>
                <ul>{blogs.filter(blog => blog.author === name).map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
            </div>            
        </div>

    )

}

export default UserDetails