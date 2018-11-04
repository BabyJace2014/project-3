import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Modal, Segment, Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../InlineError';
import API from "../../utils/API";

class SignUp extends React.Component {

    state = {
        toProfile: false,

        data: { firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPwd: ""
                },
                
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target;

        this.setState( {
            data: {...this.state.data, [name]: value }
        });

        if ( name === "confirmPwd" ) {
            let errorMsg = this.state.data.password.startsWith(value) ? "" : "Does not match Password";
            this.setState({ errors: { [name]: errorMsg } } );
        }
    }

    onCreate = event => {
        event.preventDefault();
        
        const errors = this.validate( this.state.data );
        this.setState({ errors });

        if ( Object.keys(errors).length === 0 ) {
            API.createUser( this.state.data )
                .then( res => {
                    if ( res.data.error ) {
                        this.setState({ errors: {global: res.data.error} });
                    } else {
                        this.props.appAuth( true, res.data );
                        this.setState({toProfile: true});
                    }
                })
                .catch( err => {
                    this.setState( { errors: {global: err.data.error}} );
                });
            }
    }

    validate = data => {
        const errors = {};

        if ( !Validator.isEmail(data.email) )
            errors.email = "Invalid email";

        if ( !data.password )
            errors.password = "Can't be blank";

        if ( data.password.length < 8 )
            errors.password = "Must be at least 8 characters";

        if ( !data.confirmPwd )
            errors.confirmPwd = "Can't be blank";

        if ( data.password && data.confirmPwd && data.password !== data.confirmPwd )
            errors.global = "Passwords do not match";

        if ( !data.firstname )
            errors.firstname = "Please enter your first name";

        if ( !data.lastname )
            errors.lastname = "Please enter your last name";

        return errors;
    }

    render() {
        const { data, errors } = this.state;

        if (this.state.toProfile)
            return <Redirect to="/profile" />

        return (
            <Modal.Content>
                <Message attached
                        header='Welcome to Bookwormz!'
                        content='Please fill in the form below to create an account.'
                />

                <Form className='attached fluid' onSubmit={this.onCreate}>
                <Segment textAlign='left' size='large'>
                    { errors.global && <Message negative>
                    <Message.Header>Error</Message.Header>
                        <p>{errors.global}</p>
                    </Message>}

                    <Form.Group widths='equal'>
                        <Form.Field error={!!errors.firstname} required>
                            <label htmlFor="firstname" >First Name</label>
                            <input
                                fluid='true'
                                type="text"
                                name="firstname"
                                placeholder='First Name'
                                autoFocus
                                value={data.firstname}
                                onChange={this.onChange} />
                            { errors.firstname && <InlineError text={errors.firstname} /> }
                        </Form.Field>
                        <Form.Field error={!!errors.lastname} required>
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                fluid='true'
                                type='text'
                                name="lastname"
                                placeholder='Last Name'
                                value={data.lastname}
                                onChange={this.onChange} />
                            { errors.lastname && <InlineError text={errors.lastname} /> }
                        </Form.Field>
                    </Form.Group>

                    <Form.Field error={!!errors.email} required>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@example.com"
                            value={data.email}
                            onChange={ this.onChange } />
                        { errors.email && <InlineError text={errors.email} /> }
                    </Form.Field>

                    <Form.Field error={!!errors.password} required>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password (min 8 characters)"
                            value={data.password}
                            onChange={ this.onChange } />
                        { errors.password && <InlineError text={errors.password} /> }
                    </Form.Field>

                    <Form.Field error={!!errors.confirmPwd} required>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPwd"
                            placeholder="Re-enter password"
                            value={data.confirmPwd}
                            onChange={ this.onChange } />
                        { errors.confirmPwd && <InlineError text={errors.confirmPwd} /> }
                    </Form.Field>

                    <Button size='large'>Sign Up</Button>

                </Segment>
                </Form>
            </Modal.Content>
        );
    }
}

SignUp.propTypes = {
    appAuth: PropTypes.func.isRequired
}

export default SignUp;