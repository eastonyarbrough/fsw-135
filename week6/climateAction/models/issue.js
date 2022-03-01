const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  },
  userID : {
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

module.exports = mongoose.model("Issue", issueSchema)