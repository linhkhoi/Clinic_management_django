import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Pagination, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listAppointment, updateAppointment, deleteAppointment } from '../actions/appointmentActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentListScreen() {

    let [page, setPage] = useState(1)
    const dispatch = useDispatch('')
    const appointmentList = useSelector(state => state.appointmentList)
    const { error, appointments, count } = appointmentList

    const appointmentUpdate = useSelector(state => state.appointmentUpdate)
    const { loading: loadingUpdate, success } = appointmentUpdate

    const appointmentDelete = useSelector(state => state.appointmentDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = appointmentDelete
    useEffect(() => {


        dispatch(listAppointment(page))
        console.info(appointmentList)
        if (success) {

        }
        if (successDelete) {
            dispatch(listAppointment(page))
        }

        if(errorDelete){
            toast("Delete error");
        }

    }, [dispatch, success, successDelete, page, errorDelete])

    let items = []
    for (let i = 0; i < Math.ceil(count / 10); i++)
        items.push(
            <Pagination.Item onClick={() => setPage(i + 1)}>{i + 1}</Pagination.Item>
        )

    const updateHandler = (id) => {

        dispatch(updateAppointment(id))
    }
    const deleteHandler = (id) => {
        dispatch(deleteAppointment(id))
    }
    const divStyle = {
        padding: "10px",
        borderRadius: "10px",
        border: '1px solid black',
    };
    const submitHandler = (e) => {
        e.preventDefault()
       console.info("haha")
    }

    return (
        <div style={divStyle} className="bg-white">
            <h1>Appointment List</h1>
            {loadingDelete && <Loader />}
            {loadingUpdate ? <Loader>Loading...</Loader>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <>
        <ToastContainer />
                    {/* <Form onSubmit={submitHandler} className="row justify-content-center my-auto mx-0">
                    <div className='row'>
                        <div className='col-3'>
                        <Form.Control className='control' type='text'
                            placeholder='Enter name'>
                        </Form.Control>
                        </div>
                        <div className='col-3'>
                        <Button className='btn-block btn-color' type='submit' variant='primary'>Search</Button>
                        </div>
                        </div>
                        </Form> */}
                        <Pagination>
                            {items}
                        </Pagination>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FIRST NAME</th>
                                    <th>LAST NAME</th>
                                    <th>MEET DATE</th>
                                    <th>MEET DATE</th>
                                    <th>EXPENSE</th>
                                    <th>CONFIRM</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {appointments.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.patient_first_name}</td>
                                        <td>{book.patient_last_name}</td>
                                        <td>{book.meet_date}</td>
                                        <td>{book.meet_time}</td>
                                        <td>{book.expense}</td>
                                        <td>{book.nurse ? "confirmed" : <Button variant='primary' className='btn-sm' onClick={() => updateHandler(book.id)}>
                                            confirm
                                        </Button>}</td>
                                        <td><Button variant='primary' className='btn-sm' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(book.id) }}>
                                            Delete
                                        </Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>}

        </div>
    )
}

export default AppointmentListScreen
