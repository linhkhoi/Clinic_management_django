import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { bookingApp } from '../actions/bookActions'
import Loader from '../components/Loader'
import '../index.css'
import { 
    BOOKING_RESET
 } from '../constants/bookConstants'
function BookingScreen({history}) {

    const [meetDate, setMeetDate] = useState('')
    const [meetTime, setMeetTime] = useState('')

    const booking = useSelector(state => state.booking)
    const {error, loading, success } = booking

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            alert("You was booked success!")
            dispatch({
                type: BOOKING_RESET,
            })
        }
        
    }, [success,dispatch])

    const createBooking = (e) => {
        e.preventDefault()
        dispatch(bookingApp({
            "meet_date": meetDate,
            "meet_time": meetTime,
            "expense": "120000",
            "patient": userInfo.id,
            "nurse": null
        }))
    }

    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        
        loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <div className='container' style={{width:"50%"}}>
                
        <Form onSubmit={createBooking} style={divStyle} className="bg-white"> 
        <h1 className='text-center'>BOOKING APPOINTMENT</h1>
            <Form.Group className="mb-3" controlId="meetDate">
                <Form.Label>Meet Date:</Form.Label>
                <Form.Control
                style={{borderRadius : "10px"}}
                type="date"
                name="duedate"
                placeholder="Enter Meet Date"
                value={meetDate}
                onChange={(e) => setMeetDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="meetDate">
                <Form.Label>Meet Date:</Form.Label>
                <Form.Control
                style={{borderRadius : "10px"}}
                type="time"
                name="duedate"
                placeholder="Enter Meet Date"
                value={meetTime}
                onChange={(e) => setMeetTime(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="btn-color" variant="primary" type="submit" style= {{borderRadius : "10px",}}>
                Submit
            </Button>
        </Form>
        </div>
    ))
}

export default BookingScreen
