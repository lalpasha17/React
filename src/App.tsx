import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { TodoIndex } from './components/todo-index';
import { UserRegister } from './components/userregister';
import { UserLogin } from './components/userlogin';
import { AppointmentDashboard } from './components/appointmentsDashboard';
import { AddAppointment } from './components/add-appointment';
import { EditAppointment } from './components/editappointment';
import { DeleteAppointment } from './components/delete-appointment';

function App() {
  return (
    <div className="App bgimage">
     <BrowserRouter>
     <section>
      <Routes>
          <Route path='/' element={<TodoIndex />}/>
          <Route path='register' element={<UserRegister/>} />
          <Route path='login' element={<UserLogin/>} />
          <Route path='appointments-dashboard' element={<AppointmentDashboard/>} />
          <Route path='add-appointment' element={<AddAppointment/>} />
          <Route path='edit-appointment/:id' element={<EditAppointment/>}/>
          <Route path='delete-appointment/:id' element={<DeleteAppointment/>}/>
      </Routes>
     </section>
     </BrowserRouter>
    </div>
  );
}

export default App;
