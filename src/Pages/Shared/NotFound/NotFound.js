import React from 'react';
import sleeping from '../../../images/sleeping.jpg'

const NotFound = () => {
    return (
        <div>
            <h2 className='text-danger text-center'>Mechanic is sleeping</h2>
            <div className='w-50 mx-auto'>
                <img className='img-fluid' src={sleeping} alt="" />
            </div>
        </div>
    );
};

export default NotFound;