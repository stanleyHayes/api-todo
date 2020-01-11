const express = require("express");

const router = express.Router();

/*
* Create a new user
* status codes 200, 500
* body - name, username, email, password
* */

router.post("/register", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Create a new user
* status codes 200, 500
* */

router.post("/login", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Edit existing user
* status codes 200, 500
* */

router.put("/:userID", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Change password
* status codes 200, 500
* */

router.post("/change-password", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Recover password
* status codes 200, 500
* */

router.post("/reset-password", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Verify a created user
* status codes 200, 500
* */

router.post("/verify-account", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Delete user
* status codes 200, 500
* */

router.delete("/:userID", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* De-activate user account
* status codes 200, 500
* */

router.post("/deactivate", async function (req, res, next) {
    try {

    }catch (e) {
        return res.status(500).json({error: e.message});
    }
});