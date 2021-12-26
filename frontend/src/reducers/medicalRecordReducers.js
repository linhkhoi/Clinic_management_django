import { 
    MEDICAL_CREATE_REQUEST,
    MEDICAL_CREATE_SUCCESS,
    MEDICAL_CREATE_FAIL,
    MEDICAL_LIST_REQUEST,
    MEDICAL_LIST_SUCCESS,
    MEDICAL_LIST_FAIL,
    MEDICAL_UPDATE_REQUEST,
    MEDICAL_UPDATE_SUCCESS,
    MEDICAL_UPDATE_FAIL,

    MEDICAL_DETAILS_REQUEST,
    MEDICAL_DETAILS_SUCCESS,
    MEDICAL_DETAILS_FAIL
 } from '../constants/medicalRecordConstants'
 
export const medicalListReducer = (state ={medicals:[]}, action) =>{
    switch (action.type) {
        case MEDICAL_LIST_REQUEST:
            return { loading: true, medicals: [] }

        case MEDICAL_LIST_SUCCESS:
            return { loading: false, medicals: action.payload }

        case MEDICAL_LIST_FAIL:
            return { loading: false, medicals: action.payload }

        default:
            return state
    }
}

export const medicalUpdateReducer = (state = { medical: {} }, action) => {
    switch (action.type) {
        case MEDICAL_UPDATE_REQUEST:
            return { loading: true }

        case MEDICAL_UPDATE_SUCCESS:
            return { loading: false, success: true, medical: action.payload }

        case MEDICAL_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const medicalDetailsReducer = (state = { medical: {} }, action) => {
    switch (action.type) {
        case MEDICAL_DETAILS_REQUEST:
            return { loading: true }

        case MEDICAL_DETAILS_SUCCESS:
            return { loading: false, success: true, medical: action.payload }

        case MEDICAL_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const medicalCreateReducer = (state = { medical: {} }, action) => {
    switch (action.type) {
        case MEDICAL_CREATE_REQUEST:
            return { loading: true }

        case MEDICAL_CREATE_SUCCESS:
            return { loading: false, success: true, medical: action.payload }

        case MEDICAL_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
