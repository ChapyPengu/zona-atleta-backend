class CommentInterface {

  constructor(comment) {
    this.id = comment.id
    this.message = comment.message
    this.date = comment.date
    this.client = comment.client
    this.response = comment.response
  }
}

module.exports = CommentInterface