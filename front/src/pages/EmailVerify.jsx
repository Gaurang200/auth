import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmailVerify = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            const response = await axios.post('/admin/verify-email', { token });
            console.log(response,'ree');
            
            const data = response.data
            if (data.status) {
             
                // toast.success(data.message);
                toast.success(data.message);


                setTimeout(()=>{

                  navigate('/login');
                  
                },1500)
            } else {
              toast.error('Email verification failed.');
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <div>
            <h2>Email Verification</h2>
            <p>Click the button below to verify your email:</p>
            <button type='button' onClick={handleVerify} className="btn btn-primary">Verify</button>
        </div>
    );
};

export default EmailVerify;
