import axios from "axios";

export default {

    // login the user
    userLogin: function( user ) {
        return axios.post( "/user/login", user);
    },

    createUser: function ( user ) {
        return axios.post("/user", user);
    }

}