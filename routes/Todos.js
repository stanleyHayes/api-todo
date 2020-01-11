const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");

/*
* Creates new todoItem
* status codes 201, 500
* */
router.post("/", async function (req, res, next) {
    try {

        //create a todoItem from request
        const todo = {
            owner: req.body.owner,
            action: req.body.action
        };

        //add item to mongodb
        const createdTodo = await Todo.create(todo);

        //send created todoitem and a message as a response
        return res.status(201).json({todo: createdTodo, message: "Todo Created Successfully"});
    } catch (e) {
        return res.status(500).json({error: e.message, message: "Something went wrong"});
    }
});

/*
* Edit an existing todoItem
* status codes 200, 500, 404
* path todoID
* */
router.put("/:todoID", async function (req, res, next) {
    try {
        const id = req.params.todoID;
        let {action, status} = req.body;
        if (await Todo.findById(id)) {
            const updatedTodo = await Todo.findByIdAndUpdate(id, {
                action: action,
                status: status,
                date_modified: new Date()
            }, {new: true});
            return res.status(200).json({todo: updatedTodo, message: "Todo Successfully Updated"});
        } else {
            return res.status(404).json({error: "Todo not found"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* get a todoItem
* status codes 200, 500, 404
* */
router.get("/:todoID", async function (req, res, next) {
    try {
        const id = req.params.todoID;
        const todoFromDB = await Todo.findById(id).populate("owner");
        if (!todoFromDB) {
            return res.status(404).json({error: "Todo not found"});
        } else {
            return res.status(404).json({todo: todoFromDB});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Get todoItems
* status codes 200, 500
* query - owner,status
*
* design url localhost:5000/api/v1/todos?owner=owner_id&status=status
* */
router.get("/", async function (req, res, next) {
    try {
        const query = req.query;
        const todos = await Todo.find(query).populate("author");
        return res.status(200).json({todos: todos});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* Delete a todoItem
* status codes 200, 500, 404
* */

router.delete("/:todoID", async function (req, res, next) {
    try {
        const todoID = req.params.todoID;
        await Todo.findByIdAndRemove(todoID);
        if(await Todo.findById(todoID)){
            return res.status(400).json({error: "Something went wrong"});
        }
        return res.status(200).json({message: "Todo successfully deleted"});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* Delete all todoItems of an owner
* status codes 200, 500, 404
* */

router.delete("/", async function (req, res, next) {
    try {
        const query = req.query;
        await Todo.delete(query);
        const todos = await Todo.find({query});
        if(todos.length > 0){
            return res.status(400).json({error: "Something went wrong"});
        }
        return res.status(200).json({todos: todos, message: "Todos successfully deleted"});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});