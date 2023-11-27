const { Schema } = require('mongoose');


const imageSchema = new Schema(
    {
      photoId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
          formattedDate = date.toDateString();
          return formattedDate
        }
      },
    }
  );

  module.exports = imageSchema;