import { 
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_LIST_FAIL
 } from '../constants/scheduleConstants'
 import axios from 'axios'


export const listSchedule = () => async (dispatch,getState) => {
    try {
        dispatch({ type: SCHEDULE_LIST_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const {
            userLogin: { userInfo },
        } = getState()
        let path =''
        if(userInfo.role === 'DOCTOR')
            path = 'scheduleDoctors/?doc_id'
        else
            path = 'scheduleNurses/?nurse_id'
        const res  = await axios.get(
            `http://127.0.0.1:8000/${path}=${userInfo.id}`,
            config
            )
        dispatch({
            type: SCHEDULE_LIST_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: SCHEDULE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
 }