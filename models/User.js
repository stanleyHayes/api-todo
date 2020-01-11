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
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["verified", "active", "blocked", "deactivated", "unverified"],
        default: "unverified"
    },
    name: {
        required: true,
        type: String
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;