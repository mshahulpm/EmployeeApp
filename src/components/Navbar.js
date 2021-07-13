import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar'>
            <h1>Employee App</h1> 
            <div className='links'>
             <Link to='/'>Add Employee</Link>
             <Link to='/employees'>All Employees</Link>
            </div>
        </div>
    ) 
}

export default Navbar
