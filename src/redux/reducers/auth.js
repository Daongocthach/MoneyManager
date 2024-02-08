const initialState = {
    uid: '',
    email: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        }

        case 'LOGOUT': {
            return {
                uid: '',
                email: ''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
