import * as types from '../constants/ActionTypes'

var initState = [];

var myReducer = (state = initState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            var boards = action.boardsData
            console.log('reutrn in action: ', boards )
            
            return boards
        default: 
        console.log('Return Default')
            return state
    }
}

export default myReducer