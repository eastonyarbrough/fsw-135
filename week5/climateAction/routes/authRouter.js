const express = require('express');
const authRouter = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

authRouter
    .get('/', (req, res, next) => {
        User.find((err, users) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(users);
        })
    }) //DEV TEST GET ALL

    .delete('/:userID', (req, res, next) => {
        User.findOneAndDelete({_id: req.params.userID}, (err, deleted) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send('Item successfully deleted')
        })
    }) //DEV TEST DELETE ONE

    .get('/search/user', (req, res, next) => {
        User.findOne({_id: req.query._id}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(user);
        })
    }) //GET query user

    .post('/signup', (req, res, next) => {
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (user) {
                res.status(403);
                return next(new Error('Username already exists'));
            }
            const newUser = new User(req.body);
            newUser.save((err, savedUser) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
                return res.status(201).send({token, user: savedUser.withoutPassword()})
            })
        })
    }) //signup

    .post('/login', (req, res, next) => {
        const failedLogin = 'Invalid login information';
        User.findOne({userName: req.body.userName.toLowerCase()}, (err, user) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            user.checkPassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.status(403);
                    return next(new Error(failedLogin));
                }
                if (!isMatch) {
                    res.status(403);
                    return next(new Error(failedLogin));
                }
                const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
                return res.status(200).send({token, user: user.withoutPassword()});
            })
        })
    }) //login

module.exports = authRouter;