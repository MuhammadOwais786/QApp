function reducer (state = {}, action) {
    console.log('reducer chala', action)
    switch(action.type) {
        case 'SET_USER': {
            return { ...state, user: action.data }
        }
        case 'UNSET_USER': {
            return { ...state, user: null }
        }
        default: {
            return state
        }
    }
}

export default reducer