import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Button} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMedicals } from '../actions/medicalRecordActions'
import moment from 'moment'

function MedicalRecordScreen({match, history}) {
    const dispatch = useDispatch('')
    const medicalList = useSelector(state => state.medicalList)
    const {error,loading, medicals} =  medicalList 
    
    // const {
    //     userLogin: { userInfo },
    // } = getState()

    useEffect(()=>{
        dispatch(listMedicals(match.params.id))
        
    },  [dispatch])


    const editHandler = (e,id) => {
        e.preventDefault()
        window.location.href = `/doctor/medical-record-edit/${id}`; 
        
    }
    const createHandler = (e) => {
        e.preventDefault()
        window.location.href = `/doctor/medical-record-new/`; 
        
    }
    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
            <h1>Medical Record List</h1>
            {loading ? <Loader>Loading...</Loader>
                : error ? <Message variant='danger'>{error}</Message>
            : 
            <>
            <Button variant='primary' className='btn-sm' onClick={(e) => {createHandler(e)}}>
                                                    Create
                        </Button>
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Sick Name</th>
                    <th>UPDATE</th>
                </tr>
            </thead>

            <tbody>
                {medicals.map(medical => (
                    <tr key={medical.id}>
                        <td>{medical.id}</td>
                        <td>{moment(medical.start_date).format('DD/MM/YYYY, h:mm:ss a')}</td>
                        <td>{moment(medical.end_date).format('DD/MM/YYYY, h:mm:ss a')}</td>
                        <td>{medical.sick_name}</td>
                        <td><Button variant='primary' className='btn-sm' onClick={(e) => {editHandler(e, medical.id)}}>
                                                    Update
                        </Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>}
            
        </div>
    )
}

export default MedicalRecordScreen
