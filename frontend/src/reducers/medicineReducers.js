import { 
    MEDICINE_LIST_REQUEST,
    MEDICINE_LIST_SUCCESS,
    MEDICINE_LIST_FAIL
 } from '../constants/medicineConstants'
 
export const medicineListReducer = (state ={medicines:[]}, action) =>{
    switch (action.type) {
        case MEDICINE_LIST_REQUEST:
            return { loading: true, medicines: [] }

        case MEDICINE_LIST_SUCCESS:
            return { loading: false, medicines: action.payload }

        case MEDICINE_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}