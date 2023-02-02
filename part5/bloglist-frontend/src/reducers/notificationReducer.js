const notificationReducer = (state = null, action) => {
    if(action.type === 'NEW_NOTIFICATION'){
        return action.data
    }
    else{
        return state
    }
    
}


export const displayNotification = (notification) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: notification
    }
}




export default notificationReducer