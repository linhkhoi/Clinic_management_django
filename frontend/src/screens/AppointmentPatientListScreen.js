import React, { useEffect,useState } from 'react'
import { Table, Button,Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAppointmentPatient, deleteAppointment} from '../actions/appointmentActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import cookies from 'react-cookies'
function AppointmentPatientListScreen({match, history}) {
    const appointmentId = match.params.id
    let [page, setPage] = useState(1)

    const dispatch = useDispatch()
    const appointmentList = useSelector(state => state.appointmentList)
    const {error, loading, appointments, count} =  appointmentList 

    const appointmentDelete = useSelector(state => state.appointmentDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = appointmentDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(()=>{
        dispatch(listAppointmentPatient(appointmentId))
    },  [dispatch, successDelete,appointmentId])

    const updateHandler = async (id) =>  {
        await cookies.save("appointment_id", id)
        history.push('/doctor/medicine-list')
    }

    const deleteHandler = (id) => {
        dispatch(deleteAppointment(id))
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
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>MEET DATE</th>
                    <th>MEET TIME</th>
                    <th>EXPENSE</th>
                    <th>CONFIRM</th>
                </tr>
            </thead>

            <tbody>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

                {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (appointments.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.meet_date}</td>
                        <td>{book.meet_time}</td>
                        <td>{book.expense}</td>
                        <td>{userInfo.role === 'DOCTOR' ? <Button variant='primary' className='btn-sm' onClick={() => updateHandler(book.id)}>
                                                    Add Prescription
                        </Button> : <Button variant='primary' className='btn-sm' onClick={() => {if (window.confirm('Are you sure you wish to delete this item?')) deleteHandler(book.id)}}>
                                                    Delete
                        </Button> }</td>
                    </tr>
                )))}
            </tbody>
        </Table>
        </>}
        </div>
    )
}

export default AppointmentPatientListScreen
