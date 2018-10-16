import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Message, Form, Segment, Button } from 'semantic-ui-react';
import InlineError from '../InlineError';
import API from '../../utils/API';

class CreateClub extends React.Component {
    state = {
        user: {},
        data: {},
        errors: {},
        open: false
    }

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    componentWillMount = () => {
        this.setState({ user: this.props.user });
    }

    componentDidMount = () => {
        this.setState({ data: {} });
    }

    onChange = event => {
        const { name, value } = event.target;

        this.setState( {
            data: {...this.state.data, [name]: value }
        });
    }

    onSave = event => {
        event.preventDefault();

        const errors = this.validate( this.state.data );
        this.setState({ errors });

        if ( Object.keys(errors).length === 0 ) {

            let newClub = this.state.data;

            newClub = { ...newClub,
                        admin: this.props.user.email,
                        members: [{ email: this.props.user.email,
                                    name: `${this.props.user.firstname} ${this.props.user.lastname}`
                                 }]
                      };

            API.createClub( newClub )
                .then( res => {
                    if ( res.data.error ) {
                        this.setState({ errors: {global: res.data.error} });
                    } else {

                        // if it saved, send the club to the calling container
                        // through the onClose function and close this Modal
                        this.props.onClose( res.data );
                        this.close();
                    }
                })
                .catch( err => {
                    this.setState( { errors: {global: err.data.error}} );
                });
            }
    }

    validate = data => {
        const errors = {};

        if ( !data.clubname )
            errors.clubname = "Club name can't be blank";

        return errors;
    }

    render() {
        const { data, errors, open } = this.state;

        return (
            <Modal  className="app__modal"
                    trigger={<Button>Create Club</Button>}
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}  >

            <Modal.Header>Create a New Club</Modal.Header>

            <Modal.Content>

                <Form className='attached fluid' onSubmit={this.onSave}>
                <Segment textAlign='left' size='large'>
                    { errors.global && <Message negative>
                    <Message.Header>Error</Message.Header>
                        <p>{errors.global}</p>
                    </Message>}

                    <Form.Field error={!!errors.clubname} required>
                        <label htmlFor="clubname" >Club Name</label>
                        <input
                            fluid='true'
                            type="text"
                            name="clubname"
                            placeholder='Club Name'
                            autoFocus
                            value={data.clubname}
                            onChange={this.onChange} />
                        { errors.clubname && <InlineError text={errors.clubname} /> }
                    </Form.Field>

                </Segment>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button size='large' onClick={this.onSave}>Save</Button>
            </Modal.Actions>
            </Modal>
        );
    }
}

CreateClub.propTypes = {
    user: PropTypes.shape({
        firstname:  PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),

    onClose: PropTypes.func.isRequired
}

export default CreateClub;