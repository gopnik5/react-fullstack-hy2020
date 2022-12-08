import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async blog => {

  const response = await axios.post(baseUrl, blog)
  return response.data
}

const blogService = { getAll, create }

export default blogService