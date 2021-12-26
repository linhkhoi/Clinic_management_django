import axios from 'axios'
import { 
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAIL
 } from '../constants/patientConstants'

export const listPatient = (page) => async (dispatch) => {
    try {
        dispatch({ type: PATIENT_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/patients/?page=${page}`)
        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PATIENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }