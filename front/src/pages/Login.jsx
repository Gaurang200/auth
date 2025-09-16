import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const Login = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/admin/login', values);
           const data = response.data;
           console.log(data,'dataa');
           
           if(data && data.status){
            toast.success(data.message);
            const token =data.token
            console.log(token,"token");
            
            localStorage.setItem('token',token)

            setTimeout(()=>{

                navigate("/dashboard")

                window.location.reload();
            },1500)

           }else if(data && data.status===false){
            toast.error(data.message);
           }
        } catch (error) {
            console.error('err:', error);
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center vh-100 justify-content-center">
            <div className="mb-4">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => navigate('/admin-register')}
                >
                    Admin Register
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/customer-register')}
                >
                    Customer Register
                </button>
            </div>
            <div className="box shadow p-4" style={{ width: '400px'  }}>
                <h2 className="text-center">Login</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field type="password" id="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                            {/* <button type="button" className=" w-100">Login</button> */}

                        </form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
