import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../../components/Navigation";

class Club extends React.Component {

state = {
    club:   {}
}

componentWillMount = () => {
    this.setState({club: this.props.club});
}

render() {

    return (
        <div>
        <Navigation display={this.state.club.clubname} />
        <h2>Club Page</h2>
        </div>
        
        );
    }
}

Club.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),

    club: PropTypes.shape({
        clubname:  PropTypes.string.isRequired
    })
}

export default Club;