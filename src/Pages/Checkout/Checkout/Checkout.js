import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams()
    const [service] = useServiceDetail(serviceId)

    const [user] = useAuthState(auth);
    if (user) {
        console.log(user);
    }

    // const [user, setUser] = useState({
    //     name: "Akbar the great",
    //     email: "akbar@gmail.com",
    //     address: "Chittagong",
    //     phone: "0121212121"
    // })

    // const handleAddressChange = (e) => {
    //     console.log(e.target.value);
    //     const { address, ...rest } = user
    //     const newAddress = e.target.value
    //     const newUser = { address: newAddress, ...rest }
    //     console.log(newUser);
    //     setUser(newUser)
    // }

    const handlePlaceOrder = e => {
        e.preventDefault()
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response
                if (data.insertedId) {
                    toast("Your Order is Booked!!!")
                    e.target.reset()
                }
            })

    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please order :{service?.name}</h2>
            <form onSubmit={handlePlaceOrder}>

                <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service?.name} name='service' placeholder='service' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='address' required autoComplete='off' />
                <br />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;