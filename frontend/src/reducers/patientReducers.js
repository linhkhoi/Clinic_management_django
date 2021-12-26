import { 
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAIL
 } from '../constants/patientConstants'
 
export const patientListReducer = (state ={patients:[]}, action) =>{
    switch (action.type) {
        case PATIENT_LIST_REQUEST:
            return { loading: true, patients: [] }

        case PATIENT_LIST_SUCCESS:
            return { 
                loading: false, 
                patients: action.payload.results ,
                count: action.payload.count
            }

        case PATIENT_LIST_FAIL:
            return { loading: false, patients: action.payload }

        default:
            return state
    }
}