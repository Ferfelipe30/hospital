import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import PatientRegistration from './pages/PatientRegistration';
import Login from './pages/login';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AdminDoctors from './pages/doctors/adminDoctors';
import DashboardDoctors from './pages/doctors/dashboardDoctors';
import Admin from './pages/admin/adminPanel';
import RegistrarDoctor from './pages/doctors/registrarDoctor';
import VerPacientes from './pages/admin/VerPacientes';
import VerCitas from './pages/admin/VerCita';
import Configuracion from './pages/admin/Configuracion';
import { Buffer } from 'buffer';
import { supabase } from '../src/utils/supabase';
import RegisterAdmin from './pages/admin/RegisterAdmin';

window.Buffer = Buffer;

function App() {
  const [patients, setpatients] = useState([])

  useEffect(() => {
    async function getpatients() {
      const {data: patients} = await supabase.from('patients').select()
      if (patients.length > 1) {
        setpatients(patients)
      }
    }

    getpatients()
  }, [])

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/PatientRegistration' element={<PatientRegistration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/adminDoctors' element={<AdminDoctors />} />
          <Route path='/dashboardDoctor' element={<DashboardDoctors />}/>
          <Route path='/admin' element = {<Admin />} />
          <Route path='/registrarDoctor' element={<RegistrarDoctor />} />
          <Route path='/admin/ver-pacientes' element={<VerPacientes />}/>
          <Route path='/admin/ver-citas' element={<VerCitas/>}/>
          <Route path='/admin/configuracion' element={<Configuracion />}/>
          <Route path='/admin/register' element={<RegisterAdmin/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
