import axios from 'axios'
import { 
    APPOINTMENT_LIST_SUCCESS,
    APPOINTMENT_LIST_FAIL,
    APPOINTMENT_LIST_REQUEST,

    APPOINTMENT_UPDATE_FAIL,
    APPOINTMENT_UPDATE_REQUEST,
    APPOINTMENT_UPDATE_SUCCESS,

    APPOINTMENT_DELETE_REQUEST,
    APPOINTMENT_DELETE_SUCCESS,
    APPOINTMENT_DELETE_FAIL,
    APPOINTMENT_DELETE_RESET
 } from '../constants/appointmentConstants'

export const listAppointment = (page) => async (dispatch) => {
    try {
        dispatch({ type: APPOINTMENT_LIST_REQUEST })
        const { data } = await axios.get(`http://127.0.0.1:8000/appointments/?page=${page}`)
        dispatch({
            type: APPOINTMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: APPOINTMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }


export const listAppointmentPatient = (id) => async (dispatch) => {
    try {
        dispatch({ type: APPOINTMENT_LIST_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }

        const { data }  = await axios.get(
            `http://127.0.0.1:8000/appointments/get-app/?patient_id=${id}`,
            config
            )
        
        dispatch({
            type: APPOINTMENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: APPOINTMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }

 
 export const updateAppointment = (id) => async (dispatch,getState) => {
    try {
        dispatch({
            type: APPOINTMENT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.patch(
            `http://127.0.0.1:8000/appointments/${id}/`,
            {
                "id": id,
                "nurse": userInfo.id
            },
            config
        )
        dispatch({
            type: APPOINTMENT_UPDATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: APPOINTMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteAppointment = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: APPOINTMENT_DELETE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }

        await axios.delete(
            `http://127.0.0.1:8000/appointments/${id}/`,
            config
        )

        dispatch({
            type: APPOINTMENT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: APPOINTMENT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

        dispatch({
            type: APPOINTMENT_DELETE_RESET,
        })
    }
}