import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderListReducer,
    orderZaloCreateReducer
} from './reducers/orderReducers'

import { bookingReducer,bookingListReducer } from './reducers/bookReducers'
import { appointmentListReducer,appointmentUpdateReducer, appointmentDeleteReducer } from './reducers/appointmentReducers'
import { patientListReducer } from './reducers/patientReducers'
import { medicineListReducer } from './reducers/medicineReducers'
import { prescriptionCreateReducer, prescriptionListReducer, prescriptionDetailsReducer, prescriptionMedicineReducer } from './reducers/prescriptionReducers'
import { scheduleListReducer } from './reducers/scheduleReducers'
import { medicalCreateReducer,medicalListReducer,medicalUpdateReducer, medicalDetailsReducer } from './reducers/medicalRecordReducers'
import { sickListReducer } from './reducers/sickReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    booking: bookingReducer,
    bookingList: bookingListReducer,
    appointmentList: appointmentListReducer,
    appointmentUpdate: appointmentUpdateReducer,
    patientList: patientListReducer,
    medicineList: medicineListReducer,
    prescriptionCreate: prescriptionCreateReducer,
    appointmentDelete: appointmentDeleteReducer,
    prescriptionList: prescriptionListReducer,
    orderZaloCreate: orderZaloCreateReducer,
    prescriptionDetails: prescriptionDetailsReducer,
    scheduleList: scheduleListReducer,
    medicalCreate: medicalCreateReducer,
    medicalList: medicalListReducer,
    medicalUpdate: medicalUpdateReducer,
    prescriptionMedicine: prescriptionMedicineReducer,
    sickList: sickListReducer,
    medicalDetails: medicalDetailsReducer,
    
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin:{ userInfo:userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store