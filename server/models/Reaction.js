const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
      photoId: {
          type: String,
          required: true,
          minLength: 1,
      },
      reactionAuthor: {
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

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;