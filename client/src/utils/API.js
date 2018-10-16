import axios from "axios";

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

    // retrieve a list of club names that a user is a member of
    getUserClubs: function ( userEmail ) {
        return axios.get("/club/" + userEmail);
    }

}