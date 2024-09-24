import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const CustomerRegister = () => {
 



    const navigate = useNavigate(); 

    const handleSubmit = async (values) => {
        try {
              //         await axios.post('/api/user/register', {
    //             ...values,
    //             role: 'customer'
    //         });
            const res=  await axios.post('/user/register', {
                first_name: values.firstName,
                last_name:values.lastName,
                email:values.email,
                password:values.password
            });

           const data = res.data;
           if(data && data.status){
            toast.success(data.message);

            setTimeout(()=>{
                navigate("/login")
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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="box shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center">Customer Registration</h2>
                
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <Field type="text" id="firstName" name="firstName" className="form-control" />
                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <Field type="text" id="lastName" name="lastName" className="form-control" />
                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                            </div>
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
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    )}
                </Formik>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CustomerRegister;
