import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../../components/Navigation";
import CreateMeeting from "../../components/CreateMeeting";

class Club extends React.Component {

render() {
    return (
        <div>
        <Navigation />
        <h2>Club Page</h2>

        <br /><br />
        <CreateMeeting />
        
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