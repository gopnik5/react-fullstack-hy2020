import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'




const Filter = () => {

    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      dispatch(setFilter(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} value={filter}/>
      </div>
    )
  }
  
  export default Filter