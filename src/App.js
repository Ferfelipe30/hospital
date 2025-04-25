import React from 'react';
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
import Admin from './pages/admin/adminPanel';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/PatientRegistration' element={<PatientRegistration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/adminDoctors' element={<AdminDoctors />} />
          <Route path='/admin' element = {<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
