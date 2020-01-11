const express = require("express");

const router = express.Router();

/*
* Creates new todoItem
* status codes 201, 500
* */
router.post("/", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* Edit an existing todoItem
* status codes 200, 500, 404
* path todoID
* */
router.put("/:todoID", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* get a todoItem
* status codes 200, 500, 404
* */
router.get("/:todoID", async function (req, res, next) {
    try {

    }catch (e) {
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

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* Delete a todoItem
* status codes 200, 500, 404
* */

router.delete("/:todoID", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* Delete all todoItems of an owner
* status codes 200, 500, 404
* */

router.delete("/", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});