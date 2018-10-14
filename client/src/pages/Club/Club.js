import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../../react-components/Navigation";

class Club extends React.Component {

render() {
    return (
        <div>
        <Navigation />
        <h2>
            Club Page
        </h2>
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