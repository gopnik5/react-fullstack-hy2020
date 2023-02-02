import { useSelector} from 'react-redux'

const Notification = () =>{

    const notification = useSelector(state => state.notification)

    if(notification === null){
        return ''
    }

    return (
        <div>
            <span className={notification.type === 'error'? 'error': 'info'}>{notification.text}</span>
        </div>


    )
}

export default Notification