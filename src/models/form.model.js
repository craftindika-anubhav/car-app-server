import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  desired_year: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Form', formSchema);
