// contactModel.js
import mongoose from 'mongoose';
// Setup schema
const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  key: {
    type: String,
    required: false
  },
  lead: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('project', projectSchema);
