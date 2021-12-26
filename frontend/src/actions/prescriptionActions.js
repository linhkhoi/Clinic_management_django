import { 
    PRESCRIPTION_CREATE_REQUEST,
    PRESCRIPTION_CREATE_SUCCESS,
    PRESCRIPTION_CREATE_FAIL,

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
 import cookies from 'react-cookies'
 import axios from 'axios'

export const createPrescription = (prescription) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRESCRIPTION_CREATE_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        
        const { data } = await axios.post(
            `http://127.0.0.1:8000/prescriptions/add-prescription/`,
            prescription,
            config
        )

        dispatch({
            type: PRESCRIPTION_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRESCRIPTION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listPrescriptions = (page) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/prescriptions/?page=${page}`)

        dispatch({
            type: PRESCRIPTION_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRESCRIPTION_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }

 export const detailPrescription = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_DETAIL_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/prescriptions/${id}/`)
        dispatch({
            type: PRESCRIPTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRESCRIPTION_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const medicinesPrescription = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRESCRIPTION_MEDICINE_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/prescriptionDetails/?prescription_id=${id}`)
        dispatch({
            type: PRESCRIPTION_MEDICINE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRESCRIPTION_MEDICINE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}