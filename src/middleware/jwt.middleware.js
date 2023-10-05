import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function createToken(email) {
  const token = jwt.sign(
    {
      email: email,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return token;
}

export async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        status: 'FAIL',
        message: 'Missing Token',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({
        status: 'FAIL',
        message: 'Token Expired',
      });
    }
    return res.status(400).json({
      status: 'FAIL',
      message: 'Something Went Wrong',
    });
  }
}
