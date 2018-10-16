import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Modal, Segment, Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../InlineError';
import API from "../../utils/API";

class Login extends React.Component {

    state = {
        toProfile: false,

        data: { email: "",
                password: ""},
                
        errors: {}
    }

    onChange = e => {
        this.setState( {
            data: {...this.state.data, [e.target.name]: e.target.value }
        })
    }

    onLogin = e => {
        e.preventDefault();
        
        const { email } = this.state.data;
        const errors = this.validate( this.state.data );
        this.setState({ errors });

        if ( Object.keys(errors).length === 0 ) {
            API.userLogin( this.state.data )
                .then( res => {
                    // validate email on client side
                    if ( res.data.error ) {
                        this.setState({ errors: {global: res.data.error} });
                    } else if ( res.data.email === email ) {
                        this.props.appAuth( true, res.data );
                        this.setState({toProfile: true});
                    } else {
                        // this should never happen ... unless something goes very wrong on the server side!
                        this.setState({ errors: {global: "Something is very wrong ..."} });
                    }
                })
                .catch( err => {
                    this.setState( { errors: {global: `User ${err.error}`}} );
                });
            }
    }

    validate = data => {
        const errors = {};

        if ( !Validator.isEmail(data.email) )
            errors.email = "Invalid email";

        if ( !data.password )
            errors.password = "Password can't be blank";

        return errors;
    }

    render() {
        const { data, errors } = this.state;

        if (this.state.toProfile)
            return <Redirect to="/profile" />

        return (
            <Modal.Content>

                <Form className='attached fluid' onSubmit={this.onLogin}>
                <Segment textAlign='left' size='large'>
                    { errors.global && <Message negative>
                        <Message.Header>Error</Message.Header>
                            <p>{errors.global}</p>
                        </Message>
                        }

                    <Form.Input
                        error={!!errors.email}
                        type="email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        placeholder="E-mail address"
                        autoFocus
                        value={data.email}
                        onChange={this.onChange} />
                    {errors.email && <InlineError text={errors.email} /> }

                    <Form.Input
                        error={!!errors.password}
                        type="password"
                        icon='lock'
                        iconPosition='left'
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={ this.onChange } />
                    { errors.password && <InlineError text={errors.password} /> }

                    <Button fluid size="large">Sign In</Button>
                </Segment>
                </Form>

            </Modal.Content>
        );
    }

}

Login.propTypes = {
    appAuth: PropTypes.func.isRequired
}

export default Login;