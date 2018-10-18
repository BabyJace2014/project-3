import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../../components/Navigation";
import CreateMeeting from "../../components/CreateMeeting";

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
        <Navigation display={this.state.club.clubname} page="club" />
        <h2>Club Page</h2>

        <br /><br />
            <h3>Club Members:</h3>
            { this.state.club.members.map( member => (
                <h3>{member.name} (<i>{member.email}</i>)</h3>
            )) }
            <br />
            <h3>Books Read:</h3>
            { this.state.club.books.map( book => (
                <h3>{book.title}</h3>
            )) }

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
    }),

    club: PropTypes.shape({
        clubname:  PropTypes.string.isRequired
    })
}

export default Club;