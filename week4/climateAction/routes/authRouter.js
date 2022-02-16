const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

authRouter
    .post('/signup', (req, res, next) => {
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            if(user) {
                res.status(403);
                return next(new Error('Username already exists'));
            }
            const newUser = new User(req.body);
            newUser.save((err, savedUser) => {
                if(err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
                return res.status(201).send({token, user: savedUser})
            })
        })
    }) //signup

    .post('/login', (req, res, next) => {
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            if(!user || req.body.password !== user.password) {
                res.status(403);
                return next(new Error('Invalid login information'));
            }
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            return res.status(200).send({token, user});
        })
    }) //login

module.exports = authRouter;