import * as types from '../constants/ActionTypes'

export const getAll = (boardsData) => {
    return {
        type: types.LIST_ALL,
        boardsData
    }
}

export const login = (userData) => {
    console.log('userData:', userData)
    return {
        type: types.GET_DATA,
        userData
    }
}