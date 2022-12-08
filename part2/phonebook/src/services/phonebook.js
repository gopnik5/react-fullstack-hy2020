import axios from "axios";

const base_url = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(base_url)
    return request.then(response => response.data)
}


const create = person => {
    const request = axios.post(base_url, person)
    return request.then(response => response.data)
} 

const deletePerson = (id) => {
    const request = axios.delete(`${base_url}/${id}`)
    return request.then(response => response)
}

const update = person => {
    const request = axios.put(`${base_url}/${person.id}`, person)
    return request.then(response => response.data)
}

const phonebookService = {getAll, create, deletePerson, update}

export default  phonebookService