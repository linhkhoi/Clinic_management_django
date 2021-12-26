import { 
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    BOOKING_RESET,

    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
    BOOKING_LIST_FAIL
 } from '../constants/bookConstants'


 export const bookingReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOKING_REQUEST:
            return {
                loading: true
            }

        case BOOKING_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case BOOKING_RESET:
            return {
                success: false,
            }
        default:
            return state
    }
}

export const bookingListReducer = (state ={bookings:[]}, action) =>{
    switch (action.type) {
        case BOOKING_LIST_REQUEST:
            return { loading: true, bookings: [] }

        case BOOKING_LIST_SUCCESS:
            return { 
                loading: false, 
                bookings: action.payload.results,
                count: action.payload.count
            }

        case BOOKING_LIST_FAIL:
            return { loading: false, bookings: action.payload }

        default:
            return state
    }
}