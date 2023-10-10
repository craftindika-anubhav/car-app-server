import express from 'express';
import Form from '../models/form.model.js';
import sendMail from '../utils/nodemailer.util.js';
const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    if (!name || !email || !msg) {
      return res.status(300).json({
        status: 'FAIL',
        message: 'Missing Fields',
      });
    }
    const data = `
    <div>Name : ${name}</div>
    <div>Email : ${email}</div>
    <div>Message : ${msg}</div>
    `;
    await sendMail('support@autotradinggenius.com', 'Form Submission', data);
    res.status(200).json({
      status: 'SUCCESS',
      message: 'Message Sent',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

router.post('/confirm-payment', async (req, res) => {
  try {
    const { id, payment, subscriptionType, key } = req.body;
    if (key === process.env.API_KEY) {
      const data = await Form.findOneAndUpdate(
        { _id: id },
        {
          payment: payment,
          subscriptionType: subscriptionType,
        }
      );
      if (data) {
        res.status(201).json({
          status: 'SUCCESS',
          message: 'Payment Updated Successfully',
        });
      } else {
        res.status(300).json({
          status: 'FAIL',
          message: 'User not Found, Please fill form first',
        });
      }
    } else {
      return res.status(300).json({
        status: 'FAIL',
        message: 'Wrong API KEY',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

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
      id: newForm._id,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

export default router;
