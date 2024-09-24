import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    
    toast.success("Logout successfully");
    setTimeout(()=>{

      window.location.reload()
      navigate('/login');
  },1000)
  };

  return (
    <> <ToastContainer />
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Dashboard</a>
        <div className="collapse navbar-collapse justify-content-end">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
