import { 
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    PRESCRIPTION_CREATE_FAIL,
    PRESCRIPTION_CREATE_RESET,

    PRESCRIPTION_LIST_REQUEST,
    PRESCRIPTION_LIST_SUCCESS,
    PRESCRIPTION_LIST_FAIL,
    PRESCRIPTION_DETAIL_REQUEST,
    PRESCRIPTION_DETAIL_SUCCESS,
    PRESCRIPTION_DETAIL_FAIL,

    PRESCRIPTION_MEDICINE_REQUEST,
    PRESCRIPTION_MEDICINE_SUCCESS,
    PRESCRIPTION_MEDICINE_FAIL
 } from '../constants/prescriptionConstants'



export const prescriptionCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRESCRIPTION_CREATE_REQUEST:
            return {
                loading: true
            }

        case PRESCRIPTION_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                prescription: action.payload
            }

        case PRESCRIPTION_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case PRESCRIPTION_CREATE_RESET:
            return {}


        default:
            return state
    }
}

export const prescriptionListReducer = (state ={prescriptions:[]}, action) =>{
    switch (action.type) {
        case PRESCRIPTION_LIST_REQUEST:
            return { loading: true, prescriptions: [] }

        case PRESCRIPTION_LIST_SUCCESS:
            return { loading: false, 
                prescriptions: action.payload.results,
                count: action.payload.count
            }

        case PRESCRIPTION_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const prescriptionDetailsReducer = (state = {prescription: {}}, action) => {
    switch (action.type) {
        case PRESCRIPTION_DETAIL_REQUEST:
            return { loading: true}

        case PRESCRIPTION_DETAIL_SUCCESS:
            return { loading: false,success: true, prescription: action.payload }

        case PRESCRIPTION_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const prescriptionMedicineReducer = (state = {preMedicine: []}, action) => {
    switch (action.type) {
        case PRESCRIPTION_MEDICINE_REQUEST:
            return { loading: true, preMedicine: []}

        case PRESCRIPTION_MEDICINE_SUCCESS:
            return { loading: false,success: true, preMedicine: action.payload }

        case PRESCRIPTION_MEDICINE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}