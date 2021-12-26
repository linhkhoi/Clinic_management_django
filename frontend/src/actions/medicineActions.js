import { 
    MEDICINE_LIST_REQUEST,
    MEDICINE_LIST_SUCCESS,
    MEDICINE_LIST_FAIL
 } from '../constants/medicineConstants'
 import axios from 'axios'

 export const listMedicine = () => async (dispatch) => {
    try {
        dispatch({ type: MEDICINE_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/medicines/`)
        dispatch({
            type: MEDICINE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MEDICINE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }

 