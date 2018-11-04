/////////////////////////////////////////////////////////////////
// Club Schema
/////////////////////////////////////////////////////////////////

const mongoose = require('mongoose');
const User = require('./User');

const MemberSchema = new mongoose.Schema({  email:      String,
                                            name:       String});

const EventSchema = new mongoose.Schema({   name:       String,
                                            date:       String,
                                            host:       String,
                                            location:   String,
                                            book:       String,
                                            cover:      String,
                                            gr_id:      String }); // should be gr_id from BookSchema

const ClubSchema = new mongoose.Schema({
    clubname: { type: String,
                required: true,
                index: true,
                unique: true
    },

    admin:    { type: String,               // email id of member that administers this group
                required: true },

    members:  [ MemberSchema ],

    events:   [ EventSchema ]

});

var Club = mongoose.model("Club", ClubSchema);

module.exports = Club;