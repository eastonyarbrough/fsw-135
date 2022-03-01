const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  postID: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userProfImg: {
    type: String,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Comment", commentSchema)