import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Button, Pagination } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listBooking } from '../actions/bookActions'
import {deleteAppointment } from '../actions/appointmentActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function BookingListScreen({history}) {
    let [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const bookingList = useSelector(state => state.bookingList)
    const {error, loading, bookings, count} =  bookingList 

    const appointmentDelete = useSelector(state => state.appointmentDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = appointmentDelete

    useEffect(()=>{
        dispatch(listBooking(page))

        if (successDelete) {
            dispatch(listBooking(page))
        }

        if(errorDelete){
            toast("Delete error");
        }
        
    },  [dispatch, page, errorDelete,successDelete ])
    
    const checkPrescription = async (id) =>  {
        history.push(`/check-prescription/${id}`)
    }
    let items = []
    for(let i = 0; i< Math.ceil(count/10);i++)
        items.push(
            <Pagination.Item onClick={() => setPage(i+1)}>{i+1}</Pagination.Item>
        )

        const divStyle = {
            padding: "10px",
            borderRadius : "10px",
            border: '1px solid black',
          };

          const deleteHandler = (id) => {
            dispatch(deleteAppointment(id))
        }
    
    return (
        <div style={divStyle} className="bg-white">
            <h1>Appointment List</h1>
            {loading ? <Loader>Loading...</Loader>
                : error ? <Message variant='danger'>{error}</Message>
            : 
            <>
            <Pagination>
                {items}
            </Pagination>
            <ToastContainer />
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>MEET DATE</th>
                    <th>MEET TIME</th>
                    <th>EXPENSE</th>
                    <th>CONFIRM</th>
                    <th>PRESCRIPTION</th>
                </tr>
            </thead>

            <tbody>
                {bookings.map(book => (
                    <tr key={book._id}>
                        <td  className="py-4">{book.id}</td>
                        <td className="py-4">{book.meet_date}</td>
                        <td className="py-4">{book.meet_time}</td>
                        <td className="py-4">{book.expense}</td>
                        {book.nurse ? <><td>CONFIRM</td> {
                            book.prescription_id ? 
                            <td className="py-4"><Button className="btn-color" type='submit' variant='primary'  onClick={() => checkPrescription(book.prescription_id)} >Check Prescription</Button></td> :
                            <td className="py-4">No Prescription</td> 
                        }</>
                             : <td className="py-4">NOT CONFIRM</td> }
                        <td><Button variant='primary' className='btn-sm' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(book.id) }}>
                                            Delete
                                        </Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
        }
            
        </div>
    )
}

export default BookingListScreen
