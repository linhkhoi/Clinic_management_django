import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({ history }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState(null)
    const [message, setMessage] = useState('')
  
    const dispatch = useDispatch()


    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    

    useEffect(() => {
        if (userInfo) {
            history.push('/login')
        }
    }, [history, userInfo])

    
    


    const submitHandler = async (e) =>  {
        e.preventDefault()

        
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(firstName,lastName,username , email, password, image))
        }

    }

    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Image'>
                    <Form.Label>Image:</Form.Label>
                    <br />
                    <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                    
                </Form.Group>
                <Form.Group controlId='Image'>
                <Image className="w-25 h-25 py-3"
                        src={image? URL.createObjectURL(image) : null}
                        alt="user pic" roundedCircle fluid
                    />
                </Form.Group>

                
                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={'/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer >
        </div>
    )
}

export default RegisterScreen