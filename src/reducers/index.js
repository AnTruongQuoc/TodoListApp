import {combineReducers} from 'redux'
import boards from './boards'
import login from './login'

const myReducer = combineReducers({
    boards,
    login
})

export default myReducer