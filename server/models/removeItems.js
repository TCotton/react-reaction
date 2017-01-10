const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const removeSchema = new Schema({

  id: {
    type: Number,
    unique: true
  }

});

// Create a model class

const RemoveClass = mongoose.model('remove', removeSchema);

removeSchema.methods.removeItem = function (id) {

  // create a document
  return new RemoveClass({
    id
  });

};

// Export the model
module.exports = RemoveClass;
