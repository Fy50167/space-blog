const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
      reactionText: {
          type: String,
          required: true,
          maxLength: 280
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: (date) => {
              formattedDate = date.toDateString();
              return formattedDate
          }
      }
  }
);

const commentSchema = new Schema(
  {
      commentText: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 280
      },
      commentAuthor: {
          type: String,
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: (date) => {
              formattedDate = date.toDateString();
              return formattedDate
          }
      }, 
      reactions: [reactionSchema]
  },
  {
      toJSON: {
          virtuals: true,
      },
      id: false,
  }
);

commentSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Comment = model('comment', commentSchema);

module.exports = Comment;