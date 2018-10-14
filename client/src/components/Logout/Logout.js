import React from "react";
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

class Logout extends React.Component {

    componentWillMount = () => {
        this.props.appAuth( false, "" );
    }

    render() {
            return <Redirect to="/" />
    }

}

Logout.propTypes = {
    appAuth: PropTypes.func.isRequired
}

export default Logout;