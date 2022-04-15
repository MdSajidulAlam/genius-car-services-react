import React from 'react';

const Footer = () => {
    const today = new Date()
    const year = today.getFullYear()
    return (
        <footer className='mt-5 text-center'>
            <p><small>copyright @ {year}</small></p>
        </footer>
    );
};

export default Footer;