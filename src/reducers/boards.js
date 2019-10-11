import * as types from '../constants/ActionTypes'

var initState = [
    {
        boardID: 123,
        boardName: 'NewName',
        boardColor: '#ff6f5e'
    },
    {
        boardID: 123,
        boardName: 'NewName',
        boardColor: '#ff6f5e'
    },
    {
        boardID: 123,
        boardName: 'NewName',
        boardColor: '#ff6f5e'
    }
];

var myReducer = (state = initState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state
        default: 
            return state
    }
}

export default myReducer