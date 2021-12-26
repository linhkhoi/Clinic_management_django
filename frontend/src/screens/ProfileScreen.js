import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    // const [image, setImage] = useState(null)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { error, loading, user } = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.first_name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetail())
            } else {
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
                setUsername(user.username)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            const formData = new FormData()
            
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("username", username)
            formData.append("password", password)
            formData.append("avatar", avatar)
            dispatch(updateUserProfile(formData))
            setMessage('')
        }

    }
    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
        <Row className="justify-content-md-center">
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                <Row className="justify-content-md-center">
                    <Col md={5}>
                     <Image
                        src={userInfo.avatar} 
                        alt="user pic" roundedCircle fluid
                    />
                    </Col>
                    </Row>
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

                    <Button type='submit' variant='primary'>
                        Update
                </Button>

                </Form>
            </Col>
        </Row>
        </div>
    )
}

export default ProfileScreen