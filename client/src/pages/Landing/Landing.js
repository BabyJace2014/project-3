import React from 'react';
import PropTypes from 'prop-types';
import Slideshow from '../../components/Slideshow';
import { Image, Button, Modal } from 'semantic-ui-react';
import Login from '../../components/Login';
import SignUp from "../../components/SignUp";


class Landing extends React.Component {
    render() {
        return (
            <div className="content_center">
                <Image src={require(`../../assets/images/tempTitle.png`)} className="temp-title" />
                
                <Slideshow />

                <Modal  className="app__modal" trigger={<Button className="btn__landing">Sign In</Button>} >
                    <Modal.Header>Sign In</Modal.Header>
                    <Login appAuth={this.props.appAuth} />
                </Modal>

                <Modal className="app__modal" trigger={<Button className="btn__landing">Sign Up</Button>} >
                    <Modal.Header>Sign Up</Modal.Header>
                    <SignUp appAuth={this.props.appAuth} />
                </Modal>
                

            </div>
        );
    }
}

Landing.propTypes = {
    appAuth: PropTypes.func.isRequired
}

export default Landing;