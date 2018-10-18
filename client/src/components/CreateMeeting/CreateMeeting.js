import React from 'react';
import { Modal, Message, Form, Segment, Button } from 'semantic-ui-react';
import InlineError from '../InlineError';
import API from '../../utils/API';

class CreateMeeting extends React.Component {
    state = {
        data: { date: "",
                time: "",
                host: "",
                location: "",
                book: "" },
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
            this.close();            
            // newMeeting= {...newMeeting, host: this.state.user.email};
        }
    }


    validate = data => {
        const errors = {};

        if ( !data.meetingname )
            errors.meetingname = "Please provide a name for this meeting";

        if ( !data.date )
            errors.date = "Please provide a meeting date";

        if ( !data.time )
            errors.time = "Please provide a meeting time";

        if ( !data.location )
            errors.location = "Please provide a meeting location";

        if ( !data.book )
            errors.book = "Please provide a book for this meeting";

        return errors;
    }

    render = () => {
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
                                value={data.meetingname}
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
                                value={data.date}
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
                                value={data.time}
                                onChange={this.onChange} />
                            { errors.time && <InlineError text={errors.time} /> }
                            </Form.Field>

                            <Form.Field error={!!errors.location} required>
                            <label htmlFor="location" >Location</label>
                            <input
                                fluid='true'
                                type="text"
                                name="location"
                                placeholder='Location'
                                value={data.location}
                                onChange={this.onChange} />
                            { errors.location && <InlineError text={errors.location} /> }
                            </Form.Field>

                            <Form.Field error={!!errors.book} required>
                            <label htmlFor="book" >Book</label>
                            <input
                                fluid='true'
                                type="text"
                                name="book"
                                placeholder='Book'
                                value={data.book}
                                onChange={this.onChange} />
                            { errors.book && <InlineError text={errors.book} /> }
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