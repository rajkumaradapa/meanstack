const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({

   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)
