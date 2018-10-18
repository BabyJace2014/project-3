import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../../components/Navigation";
import CreateMeeting from "../../components/CreateMeeting";
import { Grid } from 'semantic-ui-react';
import '../../assets/scss/index.scss';

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

        <Grid>
            <Grid.Column width={4} padded='true' className='sidebar'>
                <h3>Club Page</h3>

                <br /><br />
                <h4>Club Members:</h4>
                { this.state.club.members.map( member => (
                    <h4>{member.name} (<i>{member.email}</i>)</h4>
                )) }
                <br />
                <h4>Books Read:</h4>
                { this.state.club.books.map( book => (
                    <h4>{book.title}</h4>
                )) }
                <CreateMeeting className='sidebar__button' />
            </Grid.Column>
        </Grid>
        
        
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