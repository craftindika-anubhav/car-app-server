import express from 'express';
import Admin from '../models/admin.model.js';
import Form from '../models/form.model.js';
import { createToken, verifyToken } from '../middleware/jwt.middleware.js';
const router = express.Router();

router.get('/check-login', verifyToken, (req, res) =>
  res.status(200).send('ok')
);

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(300).json({
        status: 'FAIL',
        message: 'Missing Fields',
      });
    }
    const adminExists = await Admin.find();
    if (adminExists && adminExists.length) {
      return res.status(300).json({
        response: 'FAIL',
        message: 'Admin Already Exists',
      });
    }
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({
      response: 'SUCCESS',
      message: 'Admin Created',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findAndValidate(email, password);
    if (!admin) {
      return res.status(404).json({
        response: 'FAIL',
        message: 'Invalid Credentials',
      });
    }
    const token = createToken(email);
    res.status(200).json({
      response: 'SUCCESS',
      message: 'Logged In',
      data: {
        email,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

router.get('/get-forms', verifyToken, async (req, res) => {
  try {
    const data = await Form.find();
    if (data) {
      res.status(200).json({
        status: 'SUCCESS',
        data,
      });
    } else {
      res.status(404).json({
        status: 'FAIL',
        message: 'No Data Found',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'FAIL',
      message: 'Internal Server Error',
    });
  }
});

export default router;
