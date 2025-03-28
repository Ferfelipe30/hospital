import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import PatientRegistration from './pages/PatientRegistration';
import Login from './pages/login';
import Header from './components/Header';
import Footer from './components/Footer';

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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
