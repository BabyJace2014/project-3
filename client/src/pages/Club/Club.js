import React from 'react';
import PropTypes from 'prop-types';

class Club extends React.Component {

render() {
    return (
        <h2>
            Club Page
        </h2>
        
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