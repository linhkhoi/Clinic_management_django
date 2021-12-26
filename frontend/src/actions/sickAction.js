import { 
    SICK_LIST_REQUEST,
    SICK_LIST_SUCCESS,
    SICK_LIST_FAIL
 } from '../constants/sickConstants'
 import axios from 'axios'

 export const listSick = () => async (dispatch) => {
    try {
        dispatch({ type: SICK_LIST_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/sicks/`)
        dispatch({
            type: SICK_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SICK_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }

 