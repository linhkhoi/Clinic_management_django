import axios from 'axios'
import CryptoJS from 'crypto-js'
import moment from 'moment'
import qs from 'qs'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,

    ORDER_ZALO_CREATE_REQUEST,
    ORDER_ZALO_CREATE_SUCCESS,
    ORDER_ZALO_CREATE_FAIL
} from '../constants/orderConstants'


export const createZaloOrder = (id, total) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ZALO_CREATE_REQUEST
        })

        // APP INFO
        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/create"
        };
        const random = Math.floor(Math.random() * 1000000);

        let transID = `${moment().format('YYMMDD')}_${random}`
        

        const items = [{}];
        
        const order = {
            app_id: config.app_id,
            app_trans_id: transID, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: "user123",
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify({
                redirecturl: `https://localhost:3000/nurse/check-pay/?appId=${transID}&preId=${id}`
            }),
            amount: total,
            description: `Lazada - Payment for the order #${transID} ${id}`,
            bank_code: "zalopayapp",
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        let rs ="";

        await axios.post(config.endpoint, null, { params: order })
        .then(res => {
            rs = res.data
        })
        .catch(err => console.log(err));
        dispatch({
            type: ORDER_ZALO_CREATE_SUCCESS,
            payload: rs.order_url
        })


    } catch (error) {
        dispatch({
            type: ORDER_ZALO_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createOrder = (appId, preId, total) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const config = {
            app_id: "2553",
            key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
            key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
            endpoint: "https://sb-openapi.zalopay.vn/v2/query"
        };
        
        let postData = {
            app_id: config.app_id,
            app_trans_id: appId, // Input your app_trans_id
        }
        
        let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        
        
        let postConfig = {
            method: 'post',
            url: config.endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };
        let rs = ''
        await axios(postConfig)
            .then(function (response) {
                rs = response.data.return_code
            })
            .catch(function (error) {
                console.log(error);
            });

        if(rs === 1){
            const {
                userLogin: { userInfo },
            } = getState()
            const configOrder = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
    
            const { data_order } = await axios.post(
                `http://127.0.0.1:8000/orders/add-order/`,
                {
                    "total_price_order": total,
                    "prescription": preId,
                    "nurse": userInfo.id
                },
                configOrder
            )
    
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data_order
            })
        }    
        

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}