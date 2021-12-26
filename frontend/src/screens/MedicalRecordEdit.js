import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createMedical, detailsMedical, updateMedical } from '../actions/medicalRecordActions'
import { listSick } from '../actions/sickAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import cookies from 'react-cookies'
import { MEDICAL_UPDATE_RESET } from '../constants/medicalRecordConstants'

function MedicalRecordEdit({ match }) {
    const [endDate, setEndDate] = useState(null)
    const [sick, setSick] = useState('')
    // const [image, setImage] = useState(null)

    const dispatch = useDispatch()

    const medicalDetails = useSelector(state => state.medicalDetails)
    const { error, loading, medical } = medicalDetails

    const medicalUpdate = useSelector(state => state.medicalUpdate)
    const { success:successUpdate, error:errorUpdate, loading:loadingUpdate } = medicalUpdate
    const medicalCreate = useSelector(state => state.medicalCreate)
    const { success:successCreate, error:errorCreate, loading:loadingCreate } = medicalCreate

    const sickList = useSelector(state => state.sickList)
    const { error: errorSick, loading: loadingSick, sicks } = sickList
    useEffect(() => {
        dispatch(listSick())
        if(match.params.id){
            if(successUpdate){
                dispatch({ type: MEDICAL_UPDATE_RESET })
                window.location.href = `/doctor/medical-record/${cookies.load('patient_id')}`
            } else {
                if(!medical){
                    dispatch(detailsMedical(match.params.id))
                } else {
                    setEndDate(medical.end_date)
                    console.info(medical)
                    console.info(endDate)
                   
                }
            }
        } else {
            if(successCreate){
                window.location.href = `/doctor/medical-record/${cookies.load('patient_id')}`
            }
        }
        
    }, [dispatch,medical,successUpdate,successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(match.params.id){
            dispatch(updateMedical(match.params.id,{
                "id" : match.params.id,
                "end_date": endDate,
                "patient": `${cookies.load('patient_id')}`,
                "sick": `${sick}`,
            }))
        } else {
            dispatch(createMedical({
                "end_date": endDate,
                "patient": `${cookies.load('patient_id')}`,
                "sick": `${sick}`,
            }))
        }
        
    }


    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <>
        <div style={divStyle} className="bg-white">
        <Row className="justify-content-md-center">
            <Col md={3}>
                <h2>MEDICAL RECORD</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    

                    <Form.Group className="mb-3" controlId="meetDate">
                        <Form.Label>End Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="duedate"
                            placeholder="Enter End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="meetDate">
                        <Form.Label>Sick:</Form.Label>
                        <select
                            disabled={loadingSick}
                            onChange={e => setSick(e.currentTarget.value)}
                            >
                            <option disabled selected>Open this select menu</option>
                            {sicks.map(sickk =>{
                                return(
                                    <option key={sickk.id} value={sickk.id}>{sickk.name}</option>
                                )   
                                })
                                }
                            </select>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>
        </Row>
        </div>
        </>
    )
}

export default MedicalRecordEdit