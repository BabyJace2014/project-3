import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileEdit from "../../components/ProfileEdit";

class Profile extends React.Component {

state = {
    user: {}
}

componentWillMount = () => {
    this.setState({ user: this.props.user });
}

onProfileEditClose = ( updatedUser ) => {
    this.setState({ user: updatedUser });
    this.props.userUpdated( this.state.user );
}

render() {
    return (
        <div>
            <h2>Profile Page</h2>

            <h3>Welcome {this.state.user.firstname} {this.state.user.lastname}!</h3>
            <p>Address:  {this.state.user.address ? this.state.user.address : ""}</p>
            <p>Phone: {this.state.user.phone ? this.state.user.phone : ""}</p>

            <Link to="/logout">Logout</Link>
            <br />
            <ProfileEdit user={this.state.user} onClose={this.onProfileEditClose} />

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