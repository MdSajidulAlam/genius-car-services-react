import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Register = () => {
    const nameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user)

    if (loading || updating) {
        return <Loading></Loading>
    }
    if (token) {
        navigate('/home')
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        console.log('Updated profile');
        // navigate('/home')
    }

    return (
        <div className='container w-50 mx-auto'>
            <h2 className='text-primary text-center'>Please Register here</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" >
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" placeholder="Your Name" required />

                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check className={agree ? "text-primary" : "text-danger"} onClick={() => setAgree(!agree)} name='terms' type="checkbox" label="Accept Terms and Conditions" />
                </Form.Group>
                <Button disabled={!agree} variant="primary w-50 mx-auto d-block mb-2" type="submit" >
                    Register
                </Button>
            </Form>
            <p className='mt-3'>Already have an account?<Link to='/login' className='text-primary text-decoration-none' >Please Login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;