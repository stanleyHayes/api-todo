const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    date_joined: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;