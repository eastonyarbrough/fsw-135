const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

commentRouter
    .get("/", (req, res, next) => {
        Comment.find((err, comments) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send(comments)
        })
    }) // DEV TEST GET all

    .delete("/:commentID", (req, res, next) => {
        Comment.findOneAndDelete({_id: req.params.commentID}, (err, comment) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200).send("Item successfully deleted")
        })
    }) // DEV TEST DELETE one

    .get("/search/post", (req, res, next) => {
        Comment.find({postID: req.query.postID}, (err, comments) => {
            if (err) {
                res.status(500);
                return next(err);
            }

            if (comments.length === 0) {
                const error = new Error('This post has no comments yet');
                return next(error);
            }
            else if (comments.length !== 0) {
                res.status(200).send(comments)
            }
        })
    }) // GET query comments

    .post("/:post", (req, res, next) => {
        req.body.userID = req.user._id;
        req.body.userProfImg = req.user.profImg;
        req.body.userName = req.user.userName;
        req.body.postID = req.params.post;
        
        const newComment = new Comment(req.body);

        newComment.save((err, savedComment) => {
          if (err) {
            res.status(500);
            return next(err);
          }
          res.status(201).send(savedComment);
        })
      }) // POST one

module.exports = commentRouter;