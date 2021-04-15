import * as types from '../constants/ActionTypes'

var data = JSON.parse(localStorage.getItem('userData'))
var initState = data ? data : [];

var myReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_DATA:
            var user = {
                avatarURL: action.userData.avatarURL,
                birthDay: action.userData.birthDay,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                userPhone: action.userData.userPhone,
                updatedAt: action.userData.updatedAt,
            }
            state.push(user)
            localStorage.setItem('userData', JSON.stringify(state))
            return state
        default:
            return state
    }
}

export default myReducer