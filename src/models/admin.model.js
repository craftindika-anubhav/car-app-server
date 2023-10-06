import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.statics.findAndValidate = async function (email, password) {
  const foundAdmin = await this.findOne({ email });
  if (!foundAdmin) {
    return false;
  }
  const isValid = await bcrypt.compare(password, foundAdmin.password);
  return isValid ? foundAdmin : false;
};

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model('Admin', adminSchema);
