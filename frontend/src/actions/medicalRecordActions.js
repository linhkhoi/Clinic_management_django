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
 import cookies from 'react-cookies'
 import axios from 'axios'

export const createMedical = (medical) => async (dispatch) => {
    try {
        dispatch({
            type: MEDICAL_CREATE_REQUEST
        })


        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        
        const { data } = await axios.post(
            `http://127.0.0.1:8000/medical-record/`,
            medical,
            config
        )

        dispatch({
            type: MEDICAL_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MEDICAL_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const detailsMedical = (id) => async (dispatch) => {
    try {
        dispatch({
            type: MEDICAL_DETAILS_REQUEST
        })

        
        const { data } = await axios.get(`http://127.0.0.1:8000/medical-record/${id}/`)

        dispatch({
            type: MEDICAL_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MEDICAL_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMedicals = (id) => async (dispatch) => {
    try {
        dispatch({ type: MEDICAL_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/medical-record/?patient_id=${id}`)

        dispatch({
            type: MEDICAL_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MEDICAL_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }

 export const updateMedical = (id, medical) => async (dispatch) => {
    try {
        dispatch({ type: MEDICAL_UPDATE_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/medical-record/${id}/`,
            medical,
            config
        )
        
        dispatch({
            type: MEDICAL_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: MEDICAL_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}