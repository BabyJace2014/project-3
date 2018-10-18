import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileEdit from '../../components/ProfileEdit';
import CreateClub from '../../components/CreateClub';
import Navigation from '../../components/Navigation';
import ClubLink from '../../components/ClubLink';
import API from '../../utils/API';
import '../../assets/scss/index.scss';

class Profile extends React.Component {

state = {
    toClub: false,
    user: {},
    clubs: []
}

componentWillMount = () => {
    this.setState({ user: this.props.user, toClub: false }, this.loadClubs);
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

viewClub = ( clubname ) => {
    const clubNbr = this.state.clubs.findIndex(x => x.clubname === clubname);
    this.props.setClub( this.state.clubs[clubNbr]);
    this.setState({toClub: true});
}

render() {
    const name = `${this.state.user.firstname} ${this.state.user.lastname}`

    if (this.state.toClub)
        return <Redirect to="/club" />

    return (
        <div>
            <Navigation display={name} page="profile" />
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
                <ClubLink onClick={this.viewClub} clubname={club.clubname}>
                    {club.clubname}
                </ClubLink>
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

    userUpdated: PropTypes.func.isRequired,

    setClub: PropTypes.func.isRequired
}

export default Profile;