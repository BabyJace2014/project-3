const express = require('express');
const Club = require('../models/Club');

module.exports = function(app) {

    // POST route /club
    //  save a new club to the db ... if it doesn't already exist
    app.post("/club", (req, res) => {

        const clubname = req.body.clubname;

        Club.findOne( {clubname: clubname} )
            .then( function(club) {
                // if club already exists return error
                if ( club ) {
                    res.json({error: "This club already exists - please enter a unique name"});
                } else {
                    Club.create( req.body )
                        .then( function(club) {
                            res.json(club); })
                        .catch( function(err) {
                            res.json({error: err}); });
                    }})
            .catch( function(err) {
                res.json({error: err.message});
            });
    });

    // POST route /club
    //  save a new club to the db ... if it doesn't already exist
    app.get("/club/:id", (req, res) => {
        const userEmail = req.params.id;

        Club.find({members: {$elemMatch: {email: userEmail}}})
            .then( function( clubs ) {
                res.json( clubs );
            })
            .catch( function(err) {
                console.log(err);
            });
    });
}