import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Modal } from 'semantic-ui-react';
import Login from '../../components/Login';
import SignUp from "../../components/SignUp";


class Landing extends React.Component {
    render() {
        return (
            <div className="content_center">
                <Image src={require(`../../assets/images/tempTitle.png`)} className="temp-title" />
                
                <ul className="slideshow">
                    <li>
                        <Image src={require(`../../assets/images/slideshow/1.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/2.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/3.png`)} className="cvr-img"  />
                    </li>
                    <li>
                        <Image src={require(`../../assets/images/slideshow/4.png`)} className="cvr-img"  />
                    </li>
                </ul>

                <Modal className="app__modal" trigger={<Button className="btn__landing">Sign In</Button>} >
                    <Login appAuth={this.props.appAuth} />
                </Modal>

                <Modal className="app__modal" trigger={<Button className="btn__landing">Sign Up</Button>} >
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