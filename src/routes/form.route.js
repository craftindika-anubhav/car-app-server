import express from 'express';
import Form from '../models/form.model.js';
const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { first_name, email, make, model, desired_year, zip_code } = req.body;
    if (
      !first_name ||
      !email ||
      !make ||
      !model ||
      !desired_year ||
      !zip_code
    ) {
      return res.status(300).json({
        status: 'FAIL',
        message: 'Missing Fields',
      });
    }

    const newForm = new Form({
      first_name,
      email,
      make,
      model,
      desired_year,
      zip_code,
    });
    await newForm.save();

    res.status(201).json({
      status: 'SUCCESS',
      message: 'Form Submitted Successfully',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

export default router;
