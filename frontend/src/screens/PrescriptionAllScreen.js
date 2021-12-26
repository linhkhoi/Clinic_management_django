import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPrescriptions } from '../actions/prescriptionActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import moment from 'moment'
function PrescriptionListScreen({history}) {
    const dispatch = useDispatch()
    const prescriptionList = useSelector(state => state.prescriptionList)
    const {error, loading, prescriptions, count} =  prescriptionList 

    let [page, setPage] = useState(1)

    useEffect(()=>{
        dispatch(listPrescriptions(page))
    },  [dispatch, page])

    const checkPrescription = async (id) =>  {
        history.push(`/see-prescription/${id}`)
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
            <h1>Prescription List All:</h1>
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
                    <th>CREATED DATE</th>
                    <th>PRICE</th>
                    <th>IS PAID</th>
                </tr>
            </thead>

            <tbody>
                {prescriptions.map(prescription =>  (
                    <tr key={prescription.id}>
                        <td>{prescription.id}</td>
                        <td>{moment(prescription.created_date).format('DD/MM/YYYY, h:mm:ss a')}</td>
                        <td>{prescription.total_price}</td>
                        <td>{prescription.is_paid ? <Button className="btn" type='submit' variant='primary'  onClick={() => checkPrescription(prescription.id)} >Check Prescription</Button> : "Not Paid"}</td>
                    </tr>
                )
                )}
            </tbody>
        </Table>
        </>}
            
        </div>
    )
}

export default PrescriptionListScreen
