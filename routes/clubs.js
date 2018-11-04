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

    // GET route /club/:id
    //  retrieve all the clubs that the id (should be email address) is a member of 
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

    // POST route /club/update
    //  update a club in the db
    app.post("/club/update", (req, res) => {

    console.log("/club/update for club: " + req.body.clubname );
    
        Club.findOneAndUpdate(  { clubname: req.body.clubname},

                                { admin: req.body.admin,
                                  members: req.body.members,
                                  events: req.body.events },

                                { new: true} )
            .then( function(club) {
                if ( !club ) {
                    res.json({error: "Club not found"});
                } else {
                    res.json(club);
                }
            })
            .catch( function(err) {
                res.json({error: err.message});
            });
    });

}