const Notification = ({message}) =>{
    if(message === null){
        return ''
    }

    return (
        <div>
            <span className={message.type === 'error'? 'error': 'info'}>{message.text}</span>
        </div>


    )
}

export default Notification