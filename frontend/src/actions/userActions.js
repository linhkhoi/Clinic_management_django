import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'
import cookies from 'react-cookies'


export const facebookLogin = (accesstoken) => async(dispatch) => {
    console.info("ha");
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        
        let res = await axios.post(
            'http://127.0.0.1:8000/auth/convert-token',
            {
                token: accesstoken,
                backend: 'facebook',
                grant_type: 'convert_token',
                client_id: 'HaXlq9Spq7G1m1u4VSl4y6IlhbrW872TIjfjZzmU',
                client_secret:
                    'rPRyRxZIH8Olk2Uj5Fake4cMxo6PwEqObuoZYPlsfnGbDRs9nJLnFzs0rAYL2zv0G8ul4dN6Vt2zmbkszJ8LNaiJkZdotSGpPqmRSjT5YTRDDfUph4wmwmQqkk3HbB0e',
            }
        )
        console.info(res.data);
        let user = await axios.get(
            '/users/current-user/',
            {headers: {
                'Authorization': `Bearer ${res.data.access_token}`
            }}
        )
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:user.data
        })
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('userInfo', JSON.stringify(user.data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};

export const googleLogin = (accesstoken) => async(dispatch) => {
        try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        
        let res = await axios.post(
            'http://127.0.0.1:8000/auth/convert-token',
            {
                token: accesstoken,
                backend: 'google-oauth2',
                grant_type: 'convert_token',
                client_id: 'HaXlq9Spq7G1m1u4VSl4y6IlhbrW872TIjfjZzmU',
                client_secret:
                    'rPRyRxZIH8Olk2Uj5Fake4cMxo6PwEqObuoZYPlsfnGbDRs9nJLnFzs0rAYL2zv0G8ul4dN6Vt2zmbkszJ8LNaiJkZdotSGpPqmRSjT5YTRDDfUph4wmwmQqkk3HbB0e',
            }
        )
        console.info(res.data);
        let user = await axios.get(
            '/users/current-user/',
            {headers: {
                'Authorization': `Bearer ${res.data.access_token}`
            }}
        )
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:user.data
        })
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('userInfo', JSON.stringify(user.data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
};

export const login = (username,password) => async(dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })

        let res = await axios.post(
            '/o/token/',
            {
            'client_id': 'HaXlq9Spq7G1m1u4VSl4y6IlhbrW872TIjfjZzmU',
            'client_secret': 'rPRyRxZIH8Olk2Uj5Fake4cMxo6PwEqObuoZYPlsfnGbDRs9nJLnFzs0rAYL2zv0G8ul4dN6Vt2zmbkszJ8LNaiJkZdotSGpPqmRSjT5YTRDDfUph4wmwmQqkk3HbB0e',
            'username': username,
            'password': password,
            'grant_type': 'password'}
        )
        let user = await axios.get(
            '/users/current-user/',
            {headers: {
                'Authorization': `Bearer ${res.data.access_token}`
            }}
        )
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:user.data
        })
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('userInfo', JSON.stringify(user.data))

    }catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const logout = () => (dispatch)=>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('access_token')
    dispatch({type:USER_LOGOUT})
    dispatch({ type: USER_DETAIL_RESET })
}

export const register = (firstName, lastName,username, email, password, image) => async(dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })

        const formdData1 = new FormData()
        formdData1.append("file", image)
        formdData1.append("upload_preset", "clinic")
        formdData1.append("cloud_name","linhkhoi")

        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/linhkhoi/image/upload',
            formdData1
        )

        const formData = new FormData()
            
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("email", email)
        formData.append("username", username)
        formData.append("password", password)
        formData.append("avatar", res.data.secure_url)
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        // {'first_name': firstName,'last_name': lastName, 'username': username, 'email':email, 'password':password, 'avatar':avatar},
        const {data} = await axios.post(
            '/users/',
            formData,
            config
        )

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })


    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUserDetail = () => async(dispatch, getState) => {
    try{
        dispatch({
            type:USER_DETAIL_REQUEST
        })

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }

        const {data} = await axios.get(
            `/users/current-user/`,
            config
        )
        dispatch({
            type:USER_DETAIL_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }

        const { data } = await axios.patch(
            `/users/${userInfo.id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
