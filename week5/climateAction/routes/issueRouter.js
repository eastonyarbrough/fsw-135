const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

issueRouter
  .get("/", (req, res, next) => {
    Issue.find((err, issues) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(issues);
    })
  }) // GET all

  .get("/:issueID", (req, res, next) => {
    Issue.find({_id: req.params.issueID}, (err, issue) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      if (issue.length === 0) {
        const error = new Error('Sorry, that post was not found');
        return next(error);
      }
      else if (issue.length !== 0) {
        res.status(200).send(issue);
      }
    })
  }) // GET one

  .get("/search/user", (req, res, next) => {
    Issue.find({userID: req.query.userID}, (err, issues) => {
      if (err) {
        res.status(500);
        return next(err);
      }

      if (issues.length === 0) {
        const error = new Error('This user does not have any posts');
        return next(error);
      }
      else if (issues.length !== 0) {
        res.status(200).send(issues)
      }
    })
  }) // GET query user

  .post("/", (req, res, next) => {
    req.body.userID = req.user._id;
    req.body.userProfImg = req.user.profImg;
    req.body.userName = req.user.userName;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(savedIssue);
    })
  }) // POST one

  .delete("/:issueID", (req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueID },
      (err, deletedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(200).send(`Successfully removed issue: ${deletedIssue.title}`);
      }
    )
  }) // DELETE one

  .put("/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) // PUT one

  .put("/upvote/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {$inc: {upVotes: 1}},
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) // PUT upVote

  .put("/downvote/:issueID", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueID },
      {$inc: {downVotes: 1}},
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        res.status(201).send(updatedIssue);
      }
    )
  }) // PUT downVote

module.exports = issueRouter;