const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  img:{
    type: Buffer
},
imgMime:{
    type: String
},
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notification = mongoose.model('post', PostSchema);
