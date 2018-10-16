import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Navigation from "../../components/Navigation";

class Club extends React.Component {

render() {
    return (
        <div>
        <h2>Club Page</h2>
        <Link to="/profile">Profile</Link>
        </div>
        
        );
    }
}

Club.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}

export default Club;