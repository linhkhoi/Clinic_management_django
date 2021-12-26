import { 
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_LIST_FAIL
 } from '../constants/scheduleConstants'


export const scheduleListReducer = (state ={schedules:[]}, action) =>{
    switch (action.type) {
        case SCHEDULE_LIST_REQUEST:
            return { loading: true, schedules: [] }

        case SCHEDULE_LIST_SUCCESS:
            return { loading: false, schedules: action.payload }

        case SCHEDULE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}