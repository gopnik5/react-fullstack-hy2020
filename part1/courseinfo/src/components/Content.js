
import Part from './Part'

const Content = (props) =>{

    const {parts} = props;
    return (
        <div>
            <ul>
                {parts.map(part => 
                    <Part key={part.id} part={part}/>
                )}
                
            </ul>

        </div>
    )

}

export default Content