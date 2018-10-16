import axios from "axios";

export default {

    createUser: function ( user ) {
        return axios.post("/user", user);
    },

    // login the user
    userLogin: function( user ) {
        return axios.post( "/user/login", user);
    },

    updateUser: function( user ) {
        return axios.post("/user/update", user)
    }

}