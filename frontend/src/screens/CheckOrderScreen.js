import React, { useEffect } from 'react'
import { Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createZaloOrder } from '../actions/orderActions'
import { detailPrescription, medicinesPrescription } from '../actions/prescriptionActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import moment from 'moment'

function CheckOrderScreen({match}) {
    const dispatch = useDispatch()

    const orderZaloCreate = useSelector(state => state.orderZaloCreate)
    const {error: errorZa,success: successZa, loading:loadingZa, pay_url} =  orderZaloCreate 

    const prescriptionDetails = useSelector(state => state.prescriptionDetails)
    const {error: errorPre, loading:loadingPre, prescription} =  prescriptionDetails 

    const prescriptionMedicine = useSelector(state => state.prescriptionMedicine)
    const {error: errorMe, loading:loadingMe, preMedicine} =  prescriptionMedicine 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    let cdate = `${moment().format('DD/MM/YYYY')}`
    useEffect(()=>{
        dispatch(medicinesPrescription(match.params.id))
        dispatch(detailPrescription(match.params.id))
        
        
        if(successZa){
            window.location.href = pay_url;
        }
    },  [dispatch, successZa,match.params.id,pay_url])

    const submitHandler = (e, id,totalPrice) => {
        e.preventDefault()
        dispatch(createZaloOrder(id,totalPrice))
    }
    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
            {loadingZa ? <Loader>Loading...</Loader>
                : errorZa ? <Message variant='danger'>{errorZa}</Message>
            :<></>}
            {loadingMe ? <Loader>Loading...</Loader>
                : errorMe ? <Message variant='danger'>{errorMe}</Message>
            :<></>}
            {loadingPre ? <Loader>Loading...</Loader>
                : errorPre ? <Message variant='danger'>{errorPre}</Message>
            :<div class="container my-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8">
                    <div class="p-3 bg-white rounded">
                        <div class="row">
                            <div class="col-md-6">
                                <h1 class="text-uppercase">Order</h1>
                                <div class="billed"><span class="font-weight-bold text-uppercase">Billed:</span><span class="ml-1">Life Care</span></div>
                            </div>
                            <div class="col-md-6 text-right mt-3">
                                <h4 class="text-danger mb-0">Life Care</h4>
                            </div>
                        </div>
                        <div class="mt-3">
                            <div class="table-responsive">
        
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Note</th>
                                            <th>Into money</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Expense</td>
                                            <td>{parseFloat(prescription.expense).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??</td>
                                        </tr>
                                        <tr>
                                            <td>Prescription</td>
                                            <td>{parseFloat(prescription.total_price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??</td>
                                        </tr>
                                        {preMedicine.map(medicine => (
                                            <tr>
                                                <td className="px-5">{medicine.medicine_name}</td>
                                                <td className="px-5">{parseFloat(medicine.price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN?? x {medicine.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr class="table-info">
                                            <td>Total</td>
                                            <td>{(parseFloat(prescription.total_price)+parseFloat(prescription.expense)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {userInfo.role === 'NURSE' ? <Button type='submit' variant='primary'  onClick={(e) => submitHandler(e, prescription.id,parseFloat(prescription.total_price)+parseFloat(prescription.expense))} >Continue</Button> : <></> }
                            
                        </div>

                    </div>
                </div>
            </div>
        //     <FormContainer>
        //     <Form className="bg-light my-4">
        //         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        //             <Form.Label column sm="6">
        //             Prescription Id:
        //             </Form.Label>
        //             <Col sm="6">
        //             <Form.Label column sm="2">
        //             {prescription.id}
        //             </Form.Label>
        //             </Col>
        //         </Form.Group>

        //         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        //             <Form.Label column sm="6">
        //             Prescription Created Date:
        //             </Form.Label>
        //             <Col sm="6">
        //             <Form.Label column sm="2">
        //             {cdate}
        //             </Form.Label>
        //             </Col>
        //         </Form.Group>

        //         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        //             <Form.Label column sm="6">
        //             Prescription Price:
        //             </Form.Label>
        //             <Col sm="6">
        //             <Form.Label column sm="6">
        //             {parseFloat(prescription.total_price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??
        //             </Form.Label>
        //             </Col>
        //         </Form.Group>

        //         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        //             <Form.Label column sm="6">
        //             Appointment Expense:
        //             </Form.Label>
        //             <Col sm="6">
        //             <Form.Label column sm="6">
        //             {parseFloat(prescription.expense).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??
        //             </Form.Label>
        //             </Col>
        //         </Form.Group>

        //         <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        //             <Form.Label column sm="6">
        //             Total: 
        //             </Form.Label>
        //             <Col sm="6">
        //             <Form.Label column sm="6">
        //             {(parseFloat(prescription.total_price)+parseFloat(prescription.expense)).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VN??
        //             </Form.Label>
        //             </Col>
        //         </Form.Group>
                    
        //         <Button type='submit' variant='primary'  onClick={(e) => submitHandler(e, prescription.id,parseFloat(prescription.total_price)+parseFloat(prescription.expense))} >Continue</Button>
        //     </Form>
        // </FormContainer>
        }
        </div>
    )
}

export default CheckOrderScreen
