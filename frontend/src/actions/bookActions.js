import axios from 'axios'
import { 
    BOOKING_REQUEST,
    BOOKING_SUCCESS,
    BOOKING_FAIL,

    BOOKING_LIST_REQUEST,
    BOOKING_LIST_SUCCESS,
    BOOKING_LIST_FAIL
 } from '../constants/bookConstants'

import cookies from 'react-cookies'

export const bookingApp = (booking) => async (dispatch) => {
    try {
        dispatch({
            type: BOOKING_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/appointments/`,
            booking,
            config
        )
        dispatch({
            type: BOOKING_SUCCESS,
            payload: data.results,
        })


    } catch (error) {
        dispatch({
            type: BOOKING_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listBooking = (page) => async (dispatch,getState) => {
    try {
        dispatch({ type: BOOKING_LIST_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        const { data } = await axios.get(
            `http://127.0.0.1:8000/appointments/get-app/?page=${page}&patient_id=${userInfo.id}`,
            config
            )
        

        dispatch({
            type: BOOKING_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BOOKING_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }