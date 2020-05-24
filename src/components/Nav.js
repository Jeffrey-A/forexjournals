import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/journals'>Journals</Link></li>
                <li><Link to='/strategies'>Strategies</Link></li>
                <li><Link to='/login'>Log in</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        )
    }
}

export default Nav;