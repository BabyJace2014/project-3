import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Message, Form, Dropdown, Segment, Button } from 'semantic-ui-react';
import InlineError from '../InlineError';
import API from '../../utils/API';

class MeetingDetails extends React.Component {
    state = {
        user: {},
        club: {},
        data: {},
        query: "",
        options: [],
        books: [],
        errors: {},
        open: false
    }

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    componentWillMount = () => {
        this.setState({ user: this.props.user,
                        club: this.props.club
                    });
    }

    componentDidMount = () => {
        const now = new Date();

        now.setTime( now.getTime() - now.getTimezoneOffset()*60*1000 );

        const defaultDate = now.toISOString().slice(0,16);

        this.setState({ data: { name: "",
                                date: defaultDate,
                                host: this.props.user.email,
                                location: this.props.user.address,
                                book: "",
                                cover: "",
                                gr_id: "" }
        });
    }

    // in the book search input, if the user stops typing for .35 seconds
    // perform a search for the book title and populate the dropdown options
    // through the fetchOptions() method
    onSearchChange = (event, data) => {
        clearTimeout(this.timer);
        this.setState({ query: data.searchQuery });
        this.timer = setTimeout(this.fetchOptions, 350);
    }

    fetchOptions = () => {

        if ( !this.state.query )
            return;

        API.getBookList( this.state.query )
            .then( books => {
                const options = [];

                books.data.forEach( book => {
                    options.push( { key: book.gr_id,
                                    value: book.gr_id,
                                    text: book.title
                    });
                });
            
            this.setState({ options, books: books.data });
          });
      };
    
      onBookSelect = (event, data) => {
        this.state.books.forEach( book => {
            if ( book.gr_id === data.value ) {
                this.setState( {
                    data: {...this.state.data,
                            book: book.title,
                            cover: book.cover,
                            gr_id: book.gr_id
                    }
                });
            }
        });
    };
    
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
            const updatedEventList = this.state.club.events;
            
            updatedEventList.push( this.state.data );

            // setState with the updated Club information then call saveClub to make API
            // call, as a callback, so it will execute after state is fully updated!
            this.setState( {club: {...this.state.club, events: updatedEventList }},
                this.saveClub);
        }
    }

    saveClub = () => {
        API.updateClub( this.state.club )
            .then( res => {
                if ( res.data.error ) {
                    this.setState({ errors: {global: res.data.error} });
                } else {
                    // if it saved, send the updated Club info to the 
                    // calling container through the onClose function and
                    // close this Modal
                    this.props.onClose( res.data );
                    this.close();
                }
            })
            .catch( err => {
console.log(err);
                this.setState( { errors: {global: err.data.error}} );
            });
    }

    validate = data => {
        const errors = {};

        if ( !data.name )
            errors.name = "Please provide a name for this meeting";

        if ( !data.date )
            errors.date = "Please provide a meeting date";

        if ( !data.location )
            errors.location = "Please provide a meeting location";

        if ( !data.book )
            errors.book = "Please select a book for this meeting";

        return errors;
    }

    render = () => {
        const { data, errors, open } = this.state;

        return (
            <Modal  className="app__modal"
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

                        <Form.Field error={!!errors.name} required>
                            <label htmlFor="name" >Meeting Name</label>
                            <input
                                fluid='true'
                                type="text"
                                name="name"
                                placeholder='Meeting Name'
                                autoFocus
                                value={data.name}
                                onChange={this.onChange} />
                            { errors.name && <InlineError text={errors.name} /> }
                        </Form.Field>

                        <Form.Field error={!!errors.date} required>
                            <label htmlFor="date" >Date & Time</label>
                            <input
                                fluid='true'
                                type="datetime-local"
                                name="date"
                                value={data.date}
                                onChange={this.onChange} />
                            { errors.date && <InlineError text={errors.date} /> }
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
                            <label htmlFor="book" >Book: {data.book}</label>
                            <Dropdown
                                fluid
                                search
                                selection
                                options={this.state.options}
                                name="book"
                                value={data.book}
                                onSearchChange={this.onSearchChange}
                                onChange={this.onBookSelect} />
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

MeetingDetails.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }),

    club: PropTypes.shape({
        clubname:  PropTypes.string.isRequired   
    }),

    onClose: PropTypes.func.isRequired
}

export default MeetingDetails;