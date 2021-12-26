import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Pagination } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPatient } from '../actions/patientActions'
import cookies from 'react-cookies'

function PatientListScreen({history}) {
    let [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const patientList = useSelector(state => state.patientList)
    const {error, loading, patients, count} =  patientList 

    useEffect(()=>{
       
        dispatch(listPatient(page))
        
    }, [dispatch])

    let items = []
    for(let i = 0; i< Math.ceil(count/10);i++)
        items.push(
            <Pagination.Item onClick={() => setPage(i+1)}>{i+1}</Pagination.Item>
        )

    const checkAppointment = async  (id) => {
        await cookies.save("patient_id", id)
        history.push(`/doctor/patient-appointment-list/${id}`)
    }
    const checkMedical = async (id) => {
        await cookies.save("patient_id", id)
        history.push(`/doctor/medical-record/${id}`)
    }
    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
            <h1>Patient List</h1>
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
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>JOB</th>
                    <th>MEDICAL REACORD</th>
                    <th>APPOINTMENT</th>
                </tr>
            </thead>

            <tbody>
                {patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.job}</td> 
                        <td>
                            <Button variant='primary' className='btn-sm' onClick={() => checkMedical(patient.id)}>
                                CHECK
                            </Button>
                        </td>
                        <td>
                            <Button variant='primary' className='btn-sm' onClick={() => checkAppointment(patient.id)}>
                                SEE
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
        }
            
        </div>
    )
}

export default PatientListScreen
