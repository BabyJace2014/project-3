import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class Profile extends React.Component {

render() {
    return (
        <div>
        <h2>Profile Page</h2>

        <h3>Welcome {this.props.user.firstname} {this.props.user.lastname}!</h3>
        <Link to="/logout">Logout</Link>
        </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}

export default Profile;