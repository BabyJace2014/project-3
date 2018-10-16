import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Grid, Message, Form, Segment, Button, Icon } from 'semantic-ui-react';
import InlineError from '../InlineError';
import API from '../../utils/API';

class ProfileEdit extends React.Component {
    state = {
        user: {},
        errors: {},
        open: false
    }

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    componentWillMount = () => {
        this.setState({ user: this.props.user });
    }

    onChange = event => {
        const { name, value } = event.target;

        this.setState( {
            user: {...this.state.user, [name]: value }
        });
    }

    onSave = event => {
        event.preventDefault();

        const errors = this.validate( this.state.user );
        this.setState({ errors });

        if ( Object.keys(errors).length === 0 ) {
            // we already know the number is exactly 10 characters since we passed validate()
            // so format it to look like a phone number
            const { phone } = this.state.user;
            let formattedNbr = phone.replace(/[^0-9]/g, "");
            formattedNbr = `(${formattedNbr.slice(0,3)}) ${formattedNbr.slice(3,6)}-${formattedNbr.slice(-4)}`;

            // setState with the formatted phone number and then call saveUser to make API
            // call, as a callback, so it will execute after state is fully updated!
            this.setState( {user: {...this.state.user, phone: formattedNbr }},
                            this.saveUser);
            }
    }

    validate = data => {
        const errors = {};

        if ( !data.firstname )
            errors.firstname = "Please enter your first name";

        if ( !data.lastname )
            errors.lastname = "Please enter your last name";

        if ( data.phone ) {
            let justNumbers = data.phone.replace(/[^0-9]/g, "");

            if ( justNumbers.length !== 10 )
                errors.phone = "Please enter a valid phone number: ### ### ####";
        }

        return errors;
    }

    saveUser = () => {
        API.updateUser( this.state.user )
            .then( res => {
                if ( res.data.error ) {
                    this.setState({ errors: {global: res.data.error} });
                } else {
                    // if it saved, send the updated User info to the 
                    // calling container through the onClose function and
                    // close this Modal
                    this.props.onClose( res.data );
                    this.close();
                }
            })
            .catch( err => {
                this.setState( { errors: {global: err.data.error}} );
            });
    }

    render() {
        const { user, errors, open } = this.state;

        return (
            <Modal  className="app__modal"
                    trigger={<Button>Edit Profile</Button>}
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}  >

            <Modal.Header>Edit Profile</Modal.Header>

            <Modal.Content>

                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <h3>Email:</h3>
                            <p>{user.email}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Password:</h3>
                            <p>********</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    </Grid.Row>
                </Grid>

                <Form className='attached fluid' onSubmit={this.onSave}>
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
                                value={user.firstname}
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
                                value={user.lastname}
                                onChange={this.onChange} />
                            { errors.lastname && <InlineError text={errors.lastname} /> }
                        </Form.Field>
                    </Form.Group>

                    <Form.Field error={!!errors.address}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address (street address & town)"
                            value={user.address}
                            onChange={this.onChange} />
                        { errors.address && <InlineError text={errors.address} /> }
                    </Form.Field>

                    <Form.Field error={!!errors.phone}>
                        <label htmlFor="phone">Phone #</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone # (xxx-xxx-xxxx)"
                            value={user.phone}
                            onChange={this.onChange} />
                        { errors.phone && <InlineError text={errors.phone} /> }
                    </Form.Field>

                </Segment>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button size='large' onClick={this.onSave}>Save</Button>
                <PreferencesModal />
            </Modal.Actions>
            </Modal>
        );
    }
}

ProfileEdit.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),

    onClose: PropTypes.func.isRequired
}

class PreferencesModal extends React.Component {
    state = { open: false }
  
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
  
    render() {
      const { open } = this.state
  
      return (
        <Modal
          open={open}
          onOpen={this.open}
          onClose={this.close}
          className="app__layeredmodal" 
          trigger={
            <Button size='large' icon>
              Preferences <Icon name='right chevron' />
            </Button>
          }
        >
          <Modal.Header>Edit Preferences</Modal.Header>
          <Modal.Content>
            <h3><i>Coming Soon!</i></h3>
          </Modal.Content>
          <Modal.Actions>
            <Button icon='check' content='All Done' onClick={this.close} />
          </Modal.Actions>
        </Modal>
      )
    }
}

export default ProfileEdit;