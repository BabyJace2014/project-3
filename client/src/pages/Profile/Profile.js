import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal, Button } from "semantic-ui-react";
import ProfileEdit from "../../components/ProfileEdit";

class Profile extends React.Component {

render() {
    return (
        <div>
            <h2>Profile Page</h2>

            <h3>Welcome {this.props.user.firstname} {this.props.user.lastname}!</h3>

            <Link to="/logout">Logout</Link>
            <br />
            <Modal className="app__modal" trigger={<Button>Edit Profile</Button>} >
                <ProfileEdit user={this.props.user} />
            </Modal>

        </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
}

export default Profile;