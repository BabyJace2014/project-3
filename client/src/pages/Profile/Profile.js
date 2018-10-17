import React from "react";
import PropTypes from "prop-types";
import ProfileEdit from "../../components/ProfileEdit";
import CreateClub from "../../components/CreateClub";
import Navigation from "../../components/Navigation";
import API from "../../utils/API";

class Profile extends React.Component {

state = {
    user: {},
    clubs: []
}

componentWillMount = () => {
    this.setState({ user: this.props.user }, this.loadClubs);
}

loadClubs = () => {
    API.getUserClubs( this.state.user.email )
        .then( res => {
            if ( res.data ) {
                // if we found a list of clubs, then put then in the clubs array
                this.setState({ clubs: res.data });
            }
        })
        .catch( err => {
            console.log(err);
        });
}

onProfileEditClose = ( updatedUser ) => {
    this.setState({ user: updatedUser });
    this.props.userUpdated( this.state.user );
}

onCreateClubClose = ( newClub ) => {
    if ( newClub ) {
        this.setState({ clubs: [...this.state.clubs, newClub] });
    }
}

render() {

    return (
        <div>
            <Navigation />
            <h2>{this.state.user.firstname} {this.state.user.lastname}'s Profile Page</h2>

            <br /><br/>
            <h3>Your Profile Information:</h3>
            <p>Address:  {this.state.user.address ? this.state.user.address : ""}</p>
            <p>Phone: {this.state.user.phone ? this.state.user.phone : ""}</p>

            <br /><br />
            <ProfileEdit user={this.state.user} onClose={this.onProfileEditClose} />
            <br /><br />
            <CreateClub user={this.state.user} onClose={this.onCreateClubClose} />
            <br /><br /><br />

            <h3>Club's You Belong To:</h3>
            { this.state.clubs.map( club => (
                <p>{club.clubname}</p>
            )) }

        </div>
        );

    }
}

Profile.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),

    userUpdated: PropTypes.func.isRequired
}

export default Profile;