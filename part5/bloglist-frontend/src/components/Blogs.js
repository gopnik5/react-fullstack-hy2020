

import {Link} from "react-router-dom"


const Blogs = ({blogs}) =>  

{
    return blogs.sort((a, b) => b.likes - a.likes
    ).map(blog =>
        <div key={blog.id}><Link  to={`/blog/${blog.id}`}>{blog.title}</Link></div>
    )
  }

  export default Blogs


