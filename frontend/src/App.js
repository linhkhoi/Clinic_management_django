import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import BookingScreen from './screens/BookingScreen'
import BookingListScreen from './screens/BookingListScreen'
import AppointmentListScreen from './screens/AppointmentListScreen'
import PatientListScreen from './screens/PatientListScreen'
import MedicineListScreen from './screens/MedicineListScreen'
import AppointmentPatientListScreen from './screens/AppointmentPatientListScreen'
import PrescriptionListScreen from './screens/PrescriptionListScreen'
import CheckOrderScreen from './screens/CheckOrderScreen'
import CheckPayZalo from './screens/CheckPayZalo'
import PrescriptionAllScreen from './screens/PrescriptionAllScreen'
import ScheduleScreen from './screens/ScheduleScreen'
import MedicalRecordScreen from './screens/MedicalRecordScreen'
import MedicalRecordEdit from './screens/MedicalRecordEdit'
import SeeOrderScreen from './screens/SeeOrderScreen'

function App() {
  const divStyle = {
    background: "linear-gradient(rgba(250,0,0,0.5),transparent)",
    backgroundColor: "blue" 
  };

  return (
    <Router>
      <Header/>
      <main style={divStyle}>
        <Container className='p-4'>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login/' component={LoginScreen}/>
          <Route path='/register/' component={RegisterScreen}/>
          <Route path='/profile/' component={ProfileScreen}/>
          <Route path='/check-prescription/:id' component={CheckOrderScreen} />
          <Route path='/see-prescription/:id' component={SeeOrderScreen} />
          <Route path='/booking/' component={BookingScreen} />
          <Route path='/booking-list/' component={BookingListScreen} />
          
          <Route path='/nurse/appointment-list/' component={AppointmentListScreen} />
          <Route path='/nurse/prescription-list/' component={PrescriptionListScreen} />
          <Route path='/nurse/prescription-all/' component={PrescriptionAllScreen} />
          <Route path='/nurse/check-zalo/:id' component={CheckOrderScreen} />
          <Route path='/nurse/check-pay/' component={CheckPayZalo} />
          <Route path='/nurse/schedule/' component={ScheduleScreen} />

          <Route path='/doctor/patient-list/' component={PatientListScreen} />
          <Route path='/doctor/medicine-list/' component={MedicineListScreen} />
          <Route path='/doctor/patient-appointment-list/:id' component={AppointmentPatientListScreen} />
          <Route path='/doctor/schedule/' component={ScheduleScreen} />
          <Route path='/doctor/medical-record/:id' component={MedicalRecordScreen} />
          <Route path='/doctor/medical-record-new/' component={MedicalRecordEdit} />
          <Route path='/doctor/medical-record-edit/:id' component={MedicalRecordEdit} />
          
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
