import axios from 'axios';

export default {

    // save a new user
    createUser: function ( user ) {
        return axios.post("/user", user);
    },

    // login the user
    userLogin: function( user ) {
        return axios.post( "/user/login", user);
    },

    // update user info
    updateUser: function( user ) {
        return axios.post("/user/update", user)
    },

    // create a new club
    createClub: function( club ) {
        return axios.post("/club", club);
    },

    // create a new meeting
    createMeeting: function( club ) {
        return axios.post("/club/meeting", club);
    },

    // retrieve a list of club names that a user is a member of
    getUserClubs: function ( userEmail ) {
        return axios.get("/club/" + userEmail);
    },

    updateClub: function( club ) {
        return axios.post("/club/update", club);
    },

    // use the GoodReads API to return an array of books that 
    //   matches the title, author or ISBN# in query
    getBookList: function ( query ) {
        return axios.get(`/book/list/${query}`);
    },

    // use the GoodReads API to return details about a book 
    //   based on its GoodReads ID
    getBookDetails: function ( bookID ) {
        return axios.get(`/book/info/${bookID}`);
    }

}