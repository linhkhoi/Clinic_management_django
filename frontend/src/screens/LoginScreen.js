import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { login, facebookLogin, googleLogin } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import '../login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginScreen({ location, history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        if (error) {
            toast.error('Login failed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }, [history, userInfo, redirect, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    const fbResponse = (response) => {
        dispatch(facebookLogin(response.accessToken));
    }

    const googleResponse = (response) => {
        dispatch(googleLogin(response.accessToken));
    }

    return (
        <div class="container px-4 py-5 mx-auto">
            <ToastContainer/>
            <div class="card card0">
                <div class="d-flex flex-lg-row flex-column-reverse">
                    <div class="card card1">
                        <div class="row justify-content-center my-auto">
                            <Form onSubmit={submitHandler} className="row justify-content-center my-auto mx-0">
                                <div class="col-md-8 col-10 my-1 p-0">
                                    <div class="row justify-content-center px-3 mb-3"></div>
                                    <h2 class="text-center heading">Login</h2>
                                    <div class="form-group mb-0">
                                        <Form.Group controlId='username'>
                                            <Form.Label className='form-control-label text-muted'>Username </Form.Label>
                                            <Form.Control className='form-control px-4' type='username'
                                                placeholder='Enter Username'
                                                value={username} onChange={(e) =>
                                                    setUsername(e.target.value)}>

                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div class="form-group mb-0">

                                        <Form.Group controlId='password'>
                                            <Form.Label className='form-control-label text-muted'>Password</Form.Label>
                                            <Form.Control className='control' type='password'
                                                placeholder='Enter Password'
                                                value={password} onChange={(e) =>
                                                    setPassword(e.target.value)}>

                                            </Form.Control>
                                        </Form.Group>


                                    </div>
                                    <div class="row justify-content-center my-1 px-3">
                                        <Button className='btn-block btn-color' type='submit' variant='primary'>Log in</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <table>
                            <tr>
                                <td>
                                    <FacebookLogin
                                        className="btn-social"
                                        textButton="LOGIN WITH FACEBOOK"
                                        appId="279866540724157"
                                        fields="name,email,picture"
                                        callback={fbResponse}
                                    />
                                </td>
                                <td>
                                    <GoogleLogin
                                        className="btn-social"
                                        clientId="65963281795-guocpher4k54h97iijf3rrb662s4135b.apps.googleusercontent.com"
                                        buttonText="LOGIN WITH GOOGLE"
                                        onSuccess={googleResponse}
                                        onFailure={googleResponse}
                                    />

                                </td>
                            </tr>
                        </table>
                        <div class="bottom text-center mb-5">
                            <p href="#" class="sm-text mx-auto mb-3">don't have a account?
                                <Link className='btn btn-white ml-2 mx-2' to={'/register'}>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div class="card card2">
                        <div class="my-auto mx-md-4 px-md-5 right">
                            <h3 class="text-white">This is number 1 clinic in Vietnam</h3>
                            <small class="text-white">With more than 5 years of experience in medical examination and treatment, we guarantee to bring the best services to our customers.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
