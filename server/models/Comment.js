const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    photoId: {
        type: String,
        required: true,
        minLength: 1,
    },
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
    }
  },
  {
      toJSON: {
          virtuals: true,
      },
      id: false,
  }
);

// commentSchema.virtual('reactionCount').get(function () {
//   return this.reactions.length;
// });

const Comment = model('comment', commentSchema);

module.exports = Comment;