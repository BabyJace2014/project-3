import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileEdit from '../../components/ProfileEdit';
import ClubLink from '../../components/ClubLink';
import CreateClub from '../../components/CreateClub';
import Navigation from '../../components/Navigation';
import { Grid } from 'semantic-ui-react';
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
                <Grid>
                    <Grid.Column width={4} padded='true' className='sidebar'>

                        

                        <h3>Profile Page</h3>

                        <p>Address:  {this.state.user.address ? this.state.user.address : ""}</p>
                        <p>Phone: {this.state.user.phone ? this.state.user.phone : ""}</p>

                        <br /><br />
                        <div className="button-block">
                            <ProfileEdit user={this.state.user} onClose={this.onProfileEditClose} className="sidebar__button" />
                            <br /><br />
                            <CreateClub user={this.state.user} onClose={this.onCreateClubClose} className="sidebar__button" />
                        </div>
                        <br /><br /><br />

                        <h4>Club's You Belong To:</h4>
                        { this.state.clubs.map( club => (
                            <ul>
                                <li>
                                    <ClubLink onClick={this.viewClub} clubname={club.clubname} className='sidebar__link' >
                                        {club.clubname}
                                    </ClubLink>
                                </li>
                            </ul>
                        )) }
                    </Grid.Column>
                        <Grid.Column width={12} padded='true' className='info-bar'>
                    </Grid.Column>
                </Grid>
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