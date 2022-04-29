import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';

const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";
    let errorElement;

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );
    if (loading || sending) {
        return <Loading></Loading>
    }
    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message} </p>
    }
    if (user) {
        // navigate(from, { replace: true });
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        await signInWithEmailAndPassword(email, password)
        const { data } = await axios.post('http://localhost:5000/login', { email })
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });
    }

    const resetPassword = async () => {
        const email = emailRef.current.value
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email')
        }
        else {
            toast('Please enter your email')
        }
    }
    const navigateRegister = () => {
        navigate('/register')
    }
    return (
        <div className='container w-50 mx-auto'>
            <PageTitle title="Login"></PageTitle>
            <h2 className='text-primary text-center'>Please Login here</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary w-50 mx-auto d-block mb-2" type="submit">
                    Login
                </Button>
            </Form>
            <p className='mt-3'>New to Genius Car?<Link to='/register' className='text-primary text-decoration-none' onClick={navigateRegister}>Please Register</Link></p>
            <p className='mt-3'>Forget password?<button className='text-primary text-decoration-none btn btn-link' onClick={resetPassword}>Reset Password</button></p>
            {errorElement}
            <SocialLogin></SocialLogin>

        </div>
    );
};

export default Login;