import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createOrder} from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function CheckPayZalo() {

    const dispatch = useDispatch()
    const params = new URLSearchParams(window.location.search) 
    let appId = params.get('appId') 
    let preId = params.get('preId')
    let total = params.get('amount')

    const orderCreate = useSelector(state => state.orderCreate)
    const {error, loading, success } = orderCreate

    useEffect(()=>{
        dispatch(createOrder(appId,preId,total))
        if(success){
            window.location.href = 'https://localhost:3000/nurse/prescription-list'; 
        }
    },  [dispatch,success,appId,preId,total])
    return (
        <div>
            <Loader>Loading...</Loader>
            {loading ? <Loader>Loading...</Loader>
                : error  ? <Message variant='danger'>{error}</Message>
            :<></>}
            <h1>{total}</h1>
        </div>
    )
}

export default CheckPayZalo
