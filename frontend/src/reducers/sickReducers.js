import { 
    SICK_LIST_REQUEST,
    SICK_LIST_SUCCESS,
    SICK_LIST_FAIL
 } from '../constants/sickConstants'
 
export const sickListReducer = (state ={sicks:[]}, action) =>{
    switch (action.type) {
        case SICK_LIST_REQUEST:
            return { loading: true, sicks: [] }

        case SICK_LIST_SUCCESS:
            return { loading: false, sicks: action.payload }

        case SICK_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}