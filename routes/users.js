const express = require('express');
const User = require('../models/User');

module.exports = function(app) {

    // POST route /user
    //  save a new user to the db ... if it doesn't already exist
    app.post("/user", (req, res) => {

        const email = req.body.email;

        User.findOne( {email: email} )
            .then( function(user) {
                // if user already exists return error
                if ( user ) {
                    res.json({error: "User already exists"});
                } else {
                    // create a new user model based on the user
                    // data passed in
                    const newUser = new User( req.body );

                    // then encrypt the password
                    newUser.setPassword(req.body.password);

                    // then use the default Mongoose.Model.save() method to
                    // store it to the db
                    newUser.save()
                        .then( function(user) {
                            res.json(user); })
                        .catch( function(err) {
                            res.json({error: err}); });
                    }})
            .catch( function(err) {
                res.json({error: err.message});
            });
    });

    // POST route /user/login
    //  retrieve a user from the db by email
    //  then authenticate the password
    //      if VALID - return user
    //      if NOT VALID - return error
    app.post("/user/login", (req, res) => {

        const email = req.body.email;
        const password = req.body.password;
        
        User.findOne( {email: email} )
            .then( function(user) {
                if ( !user ) {
                    res.json({error: "User not found"});
                } else if ( user.isValidPassword( password ) ) {
                    res.json(user);
                } else {
                    res.json({error: "Invalid Password"});
                }
            })
            .catch( function(err) {
                res.json({error: err.message});
            });
    });

    // POST route /user/update
    //  retrieve & update user from the db by email
    app.post("/user/update", (req, res) => {

        User.findOneAndUpdate(  {email: req.body.email},

                                { firstname: req.body.firstname,
                                  lastname: req.body.lastname,
                                  address: req.body.address,
                                  phone:  req.body.phone },

                                { new: true} )
            .then( function(user) {
                if ( !user ) {
                    res.json({error: "User not found"});
                } else {
                    res.json(user);
                }
            })
            .catch( function(err) {
                res.json({error: err.message});
            });
    });


}