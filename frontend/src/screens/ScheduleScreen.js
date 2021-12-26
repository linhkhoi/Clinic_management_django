import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listSchedule } from '../actions/scheduleActions'
import moment from 'moment'
function ScheduleScreen() {
    const dispatch = useDispatch()
    const scheduleList = useSelector(state => state.scheduleList)
    const {error, loading, schedules} =  scheduleList 
    useEffect(()=>{
        dispatch(listSchedule())
        
    },  [dispatch])
    const divStyle = {
        padding: "10px",
        borderRadius : "10px",
        border: '1px solid black',
      };

    return (
        <div style={divStyle} className="bg-white">
            <h1>Schedule List</h1>
            {loading ? <Loader>Loading...</Loader>
                : error ? <Message variant='danger'>{error}</Message>
            : <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>SCHEDULE</th>
                    <th>POSITION</th>
                </tr>
            </thead>

            <tbody>
                {schedules.map(schedule => (
                    <tr key={schedule.id}>
                        <td>{schedule.id}</td>
                        <td>{moment(schedule.schedule_date).format('DD/MM/YYYY, h:mm:ss a')}</td>
                        <td>{schedule.position}</td>
                    </tr>
                ))}
            </tbody>
        </Table>}
        </div>
    )
}

export default ScheduleScreen
