// contactModel.js
import mongoose from 'mongoose';
// Setup schema
var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false
  },
  accessToken: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: new Date(),
  }
});
// Export Contact model
export default mongoose.model('user', userSchema);
