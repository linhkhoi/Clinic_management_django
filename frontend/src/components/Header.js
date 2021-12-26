import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Figure} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" className="py-0" collapseOnSelect>
                <Container className="mx-0">
                    <LinkContainer to='/'>
                    <Navbar.Brand className="pt-0">Health Care</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto mys-0">
                            {userInfo?(
                                userInfo.role === 'PATIENT' ? (
                                    <>
                                    <LinkContainer to='/booking/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Booking</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/booking-list/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Booking List</Nav.Link>
                                    </LinkContainer>
                                    </>
                                ) : userInfo.role === 'NURSE' ? (
                                    <>
                                    <LinkContainer to='/nurse/appointment-list/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Confirm Appointment</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/nurse/prescription-list/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Add Order</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/nurse/prescription-all/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>List Prescription</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/nurse/schedule/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Schedule</Nav.Link>
                                    </LinkContainer>
                                    </>
                                ) : userInfo.role === 'DOCTOR' ? (
                                    <>
                                    <LinkContainer to='/doctor/patient-list/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>History Patient</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/doctor/schedule/'>
                                    <Nav.Link className="pt-3"><i className="fab fa-elementor"></i>Schedule</Nav.Link>
                                    </LinkContainer>
                                    </>
                                ) : (<></>)         
                            ):(<></>)}
                            
                            {userInfo ? (
                                <NavDropdown 
                                title={
                                <>
                                    <Figure.Image
                                        width={40}
                                        height={40}
                                        fluid
                                        src={userInfo.avatar} 
                                    />
                                    {userInfo.last_name}
                                </>
                                } 
                                id='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/login'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ):(
                                <LinkContainer to='/login'>
                                <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}
                            
                        </Nav>
                        </Navbar.Collapse>
                   
                </Container>
                
                </Navbar>
        </header>
    )
}

export default Header
