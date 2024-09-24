import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import CustomerRegister from './pages/CustomerRegister';
import AdminRegister from './pages/AdminRegister';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';

import {jwtDecode} from 'jwt-decode';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const decodToken = jwtDecode(token);
              // console.log(decodToken,'decodeT');
              
              const curTime = Date.now() / 1000; 
              if (decodToken.exp < curTime) {
                  handleLogout(); 


              } else {
                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                  axios.post('/admin/validate-token', { token })
                      .then(response => {
                        // console.log(response);
                        
                          if (response.data.valid) {
                              setIsAuth(true);

                          } else {
                              handleLogout();
                              
                          }
                      })
                      .catch(error => {
                          console.error('Token valida err:', error);
                          handleLogout();
                      });
              }
          } catch (error) {

              console.error('errr:', error);
              handleLogout();
          }
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('token');
      setIsAuth(false);
      delete axios.defaults.headers.common['Authorization'];

  };

    return (
        <Router>
            <Routes>
                <Route path="/customer-register" element={<CustomerRegister />} />
                <Route path="/admin-register" element={<AdminRegister />} />
                <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/dashboard" element={isAuth ? <Dashboard  /> : <Navigate to="/login" />} />
                <Route path="/verify-email/:token" element={<EmailVerify />} />
            </Routes>
        </Router>
    );
}

export default App;
