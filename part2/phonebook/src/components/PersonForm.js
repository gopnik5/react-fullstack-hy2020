const PersonForm = ({onChange, value, onSubmit}) =>{


    return (

        <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onChange.name} value={value.name} />
        </div>
        <br />
        <div>
          number: <input onChange={onChange.number} value={value.number} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    )

}
export default PersonForm