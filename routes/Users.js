const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const Todo = require("../models/Todo");
const User = require("../models/User");
const SessionsController = require("../controllers/SessionsController");

async function hashPassword(plainTextPassword) {
    return bcryptjs.hash(plainTextPassword, 10);
}

async function comparePassword(plaintextPassword, userPassword) {
    return bcryptjs.compare(plaintextPassword, userPassword);
}

/*
* Create a new user
* status codes 200, 500
* body - name, username, email, password
* */
router.post("/register", async function (req, res, next) {
    try {
        const user = {
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            password: await hashPassword(req.body.password)
        };
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            return res.status(409).json({error: "Email already in use"});
        }
        const createdUser = await User.create(user);
        return res.status(201).json({user: createdUser, message: "User Successfully created"});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Create a new user
* status codes 200, 500
* */

router.post("/login", async function (req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userFromDB = await User.findOne({email: email});
        if (userFromDB) {
            if (await comparePassword(password, userFromDB.password)) {
                const token = jwt.sign({email: email}, process.env.JWT_SECRET);
                const session = {user_id: email, user_jwt: token};
                await SessionsController.createSession(session);
                return res.status(200).json({user: userFromDB, token: token});
            } else {
                return res.status(401).json({error: "Authentication Failed"});
            }
        } else {
            return res.status(404).json({error: "No account associated with this email"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

router.post('/logout', async function (req, res, next) {
    try {
        const userJWT = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(userJWT, process.env.JWT_SECRET);
        await SessionsController.deleteSession(req.body.email);
        return res.status(200).json({message: "Logout Was Successful"});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

/*
* Edit existing user
* status codes 200, 500
* */

router.put("/:userID", async function (req, res, next) {
    try {
        const token = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(token, process.env.JWT_SECRET);
        const userID = req.params.userID;
        const updatedUser = await User.findByIdAndUpdate(userID, req.body, {new: true});
        return res.status(200).json({user: updatedUser, message: "User updated"});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Change password
* status codes 200, 500
* */

router.post("/:userID/change-password", async function (req, res, next) {
    try {
        const token = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(token, process.env.JWT_SECRET);

        const oldPassword = req.body.old_password;
        const newPassword = req.body.new_password;

        const email = req.body.email;

        let user = await User.findOne({email: email});
        if(await comparePassword(oldPassword, user.password)){
            user.password = await hashPassword(newPassword);
            await user.save();
            let updatedUser = await User.findOne({email: email});
            return await res.status(200).json({user: updatedUser, message: "Password changed"});
        }else {
            return res.status(401).json({error: "Authentication Failed"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Recover password
* status codes 200, 500
* */

router.post("/reset-password", async function (req, res, next) {
    try {

        const token = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(token, process.env.JWT_SECRET);

        const email = req.body.email;


    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Verify a created user
* status codes 200, 500
* */

router.put("/:userID/verify-account", async function (req, res, next) {
    try {
        const userID = req.params.userID;
        await User.findByIdAndUpdate(userID, {status: "verified", verified: true});
        return res.status(200).json({message: "Account successfully verified"});
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


/*
* Delete user
* status codes 200, 500
* */

router.delete("/:userID", async function (req, res, next) {
    try {
        const userJWT = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(userJWT, process.env.JWT_SECRET);
        const id = req.params.userID;
        const password = req.body.password;
        const user = await User.findById(id);
        if(await comparePassword(password, user.password)){
            await User.findByIdAndRemove(id);
            await Todo.findByIdAndRemove({owner: id});
            return res.status(200).json({message: "Account successfully deleted"});
        }else {
            return res.status(401).json({error: "Authentication Failed"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

/*
* De-activate user account
* status codes 200, 500
* */

router.put("/:userID/deactivate", async function (req, res, next) {
    try {
        const userJWT = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(userJWT, process.env.JWT_SECRET);
        const userID = req.params.userID;
        const password = req.body.password;
        const user = await User.findById(userID);
        if(await comparePassword(password, user.password)){
            await User.findByIdAndUpdate(userID, {status: "deactivated"});
            return res.status(200).json({message: "Account successfully deactivated"});
        }else {
            return res.status(401).json({error: "Authentication Failed"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

router.put("/account/activate", async function (req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email: email});
        if(await comparePassword(password, user.password)){
            await User.findByIdAndUpdate(user._id, {status: "active"});
            return res.status(200).json({message: "Account successfully activated"});
        }else {
            return res.status(401).json({error: "Authentication Failed"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

router.get("/:userID", async function (req, res, next) {
    try{
        const userJWT = req.get("Authorization").slice("Bearer ".length);
        jwt.verify(userJWT, process.env.JWT_SECRET);
        const userID = req.params.userID;
        const user = await User.findById(userID);
        if(user){
            return await res.status(200).json({user: user});
        }else {
            return await res.status(404).json({error: "User not found"});
        }
    }catch (e) {
        return res.status(500).json({error: e.message, message: "Something went wrong"});
    }
});

module.exports = router;