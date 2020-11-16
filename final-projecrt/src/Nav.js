import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {

    const navStyle = {
        color: 'white'    
    }

    return (
        <nav>
            <ul className="nav-links">
                <Link style={navStyle} to='/'>
                    <li> View Events </li>
                </Link>
                <Link style={navStyle} to="/manage-courses">
                    <li> Manage Courses </li>
                </Link>
                <Link style={navStyle} to="/manage-event">
                    <li> Manage Events </li>
                </Link>

            </ul>
        </nav>
    );

  
}


export default Nav;
