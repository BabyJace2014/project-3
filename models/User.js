/////////////////////////////////////////////////////////////////
// User Schema
/////////////////////////////////////////////////////////////////

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {    type: String,
                required: true,
                lowercase: true,
                index: true,
                unique: true
    },

    password: { type: String,
                required: true},

    firstname: {type: String,
                required: true},

    lastname: { type: String,
                required: true},

    address: { type: String },

    phone: {type: String}

});

UserSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync( password, this.password );
};

UserSchema.methods.setPassword = function setPassword(password) {
    this.password = bcrypt.hashSync(password, 10);
};

var User = mongoose.model("User", UserSchema);

module.exports = User;