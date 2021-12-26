import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listMedicine } from '../actions/medicineActions'
import { createPrescription } from '../actions/prescriptionActions'
import cookies from 'react-cookies'

function MedicineListScreen({history}) {
  let [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch()
  const medicineList = useSelector(state => state.medicineList)
  const { error, loading, medicines } = medicineList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const prescriptionCreate = useSelector(state => state.prescriptionCreate)
  const { loading: loadingPre, success, error: errPre } = prescriptionCreate

  useEffect(() => {

    dispatch(listMedicine())
    if (success) {
      cookies.remove("appointment_id")
      setCartItems([])
      window.location.href = `/doctor/medical-record/${cookies.load('patient_id')}`

    }
  }, [dispatch, success])



  const onAdd = (medicine) => {
    const exist = cartItems.find((x) => x.id === medicine.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === medicine.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...medicine, qty: 1 }]);
    }
  };
  const onRemove = (medicine) => {
    const exist = cartItems.find((x) => x.id === medicine.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== medicine.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === medicine.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const totalPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);



  const placePrescription = (e) => {
    e.preventDefault()
    dispatch(createPrescription({
      "prescriptionItems": cartItems,
      "total_price": totalPrice,
      "appointment": cookies.load('appointment_id'),
      "doctor": userInfo.id
    }))
  }

  const divStyle = {
    padding: "10px",
    borderRadius : "10px",
    border: '1px solid black',
  };

return (
    <div style={divStyle} className="bg-white">
      {loadingPre ? <Loader>Loading...</Loader>
                : errPre  ? <Message variant='danger'>{errPre}</Message>
            :<></>}
      <h1>Medicine List</h1>
      {loading ? <Loader>Loading...</Loader>
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            <Col>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>ADD</th>
                  </tr>
                </thead>

                <tbody>
                  {medicines.map(medicine => (
                    <tr key={medicine.id}>
                      <td>{medicine.id}</td>
                      <td>{medicine.name}</td>
                      <td>{medicine.price}</td>
                      <td><Button variant='primary' className='btn-sm' onClick={() => onAdd(medicine)}>
                        add
                      </Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>

            <Col>
              <h2>Cart Items</h2>
              <div>
                {cartItems.length === 0 && <div>Cart is empty</div>}
                {cartItems.map((item) => (
                  <div key={item.id} className="row">
                    <div className="col-4">{item.name}</div>
                    <div className="col-4">
                      <button onClick={() => onRemove(item)} className="remove">
                        -
                      </button>{' '}
                      <button onClick={() => onAdd(item)} className="add">
                        +
                      </button>
                    </div>

                    <div className="col-4 text-right">
                      {item.qty} x ${item.price}
                    </div>
                  </div>
                ))}

                {cartItems.length !== 0 && (
                  <>
                    <hr></hr>
                    <div className="row">
                      <div className="col-2">Total</div>
                      <div className="col-1 text-right">${totalPrice}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <button onClick={placePrescription}>
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Col>
          </Row>}

    </div>
  )
}

export default MedicineListScreen
