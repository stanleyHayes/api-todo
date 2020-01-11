const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    owner: {
        required: true,
        ref: "User",
        type: Schema.Types.ObjectId
    },
    action: {
        required: true,
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false
    },
    date_modified: {
        type: Date,
        default: Date.now()
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;