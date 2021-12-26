import { 
    APPOINTMENT_LIST_SUCCESS,
    APPOINTMENT_LIST_FAIL,
    APPOINTMENT_LIST_REQUEST,

    APPOINTMENT_UPDATE_FAIL,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_RESET,
    APPOINTMENT_UPDATE_SUCCESS,

    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_DELETE_RESET
 } from '../constants/appointmentConstants'
 
export const appointmentListReducer = (state ={appointments:[]}, action) =>{
    switch (action.type) {
        case APPOINTMENT_LIST_REQUEST:
            return { loading: true, appointments: [] }

        case APPOINTMENT_LIST_SUCCESS:
            return { 
                loading: false, 
                appointments: action.payload.results,
                count: action.payload.count
            }

        case APPOINTMENT_LIST_FAIL:
            return { loading: false,  error: action.payload }

        default:
            return state
    }
}

export const appointmentUpdateReducer = (state = { appointment: {} }, action) => {
    switch (action.type) {
        case APPOINTMENT_UPDATE_REQUEST:
            return { loading: true }

        case APPOINTMENT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case APPOINTMENT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case APPOINTMENT_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}

export const appointmentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case APPOINTMENT_DELETE_REQUEST:
            return { loading: true }

        case APPOINTMENT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case APPOINTMENT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case APPOINTMENT_DELETE_RESET:
            return { loading: false, error: null }
        default:
            return state
    }
}
