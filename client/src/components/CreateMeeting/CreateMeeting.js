import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Message, Form, Segment, Button } from 'semantic-ui-react';
import InlineError from '../InlineError';
import API from '../../utils/API';

class CreateMeeting extends React.Component {
    state = {
        date: {},
        time: {},
        location: {},
        book: {},
        errors: {},
        open: false
    }

    open = () => this.setState({ open: true });
    close = () => this.setState({ close: false });

    componentWillMount = () => {
        this.setState({ user: this.props.user });
    }

    componentDidMount = () => {
        this.setState({ data: {} });
    }

    onChange = event => {
        const { name,value } = event.target;

        this.setState( {
            data: {...this.state.data, [name]: value }
        });
    }

    onSave = event => {
        event.preventDefault();

        const errors = this.validate( this.state.data );
        this.setState({ errors });

        if ( Object.keys(errors).length === 0 ) {

            let newMeeting = this.state.data;

            newMeeting = {...newMeeting,
                            location: "",
                            date: "",
                            time: "",
                            book: ""
                        };
        }
    }

    render() {
        const { data, errors, open } = this.state;

        return (
            <Modal  className="app_modal"
                    trigger={<Button>Create Meeting</Button>}
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}  >
                    
                <Modal.Header>Create New Meeting</Modal.Header>

                <Modal.Content>

                    <Form className='attached fluid' onSubmit={this.onSave}>
                    <Segment textAlign='left' size='large'>
                        { errors.global && <Message negative>
                        <Message.Header>Error</Message.Header>
                            <p>{errors.global}</p>
                        </Message>}

                        <Form.Field error={!!errors.meetingname} required>
                            <label htmlFor="meetingname" >Meeting Name</label>
                            <input
                                fluid='true'
                                type="text"
                                name="meetingname"
                                placeholder='Meeting Name'
                                autoFocus
                               // value={data.meetingname}
                                onChange={this.onChange} />
                            { errors.meetingname && <InlineError text={errors.meetingname} /> }
                        </Form.Field>
                        <Form.Field error={!!errors.date} required>
                            <label htmlFor="date" >Date</label>
                            <input
                                fluid='true'
                                type="text"
                                name="date"
                                placeholder='Date'
                                autoFocus
                               // value={data.date}
                                onChange={this.onChange} />
                            { errors.date && <InlineError text={errors.date} /> }
                        </Form.Field>
                            <Form.Field error={!!errors.time} required>
                            <label htmlFor="time" >Time</label>
                            <input
                                fluid='true'
                                type="text"
                                name="time"
                                placeholder='Time'
                                autoFocus
                               // value={data.time}
                                onChange={this.onChange} />
                            { errors.time && <InlineError text={errors.time} /> }
                            </Form.Field>
                            <Form.Field error={!!errors.date} required>
                            <label htmlFor="location" >Location</label>
                            <input
                                fluid='true'
                                type="text"
                                name="location"
                                placeholder='Location'
                                autoFocus
                               // value={data.location}
                                onChange={this.onChange} />
                            { errors.date && <InlineError text={errors.location} /> }
                            </Form.Field>
                            <Form.Field error={!!errors.book} required>
                            <label htmlFor="book" >Book</label>
                            <input
                                fluid='true'
                                type="text"
                                name="book"
                                placeholder='Book'
                                autoFocus
                               // value={data.book}
                                onChange={this.onChange} />
                            { errors.date && <InlineError text={errors.date} /> }
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

export default CreateMeeting;