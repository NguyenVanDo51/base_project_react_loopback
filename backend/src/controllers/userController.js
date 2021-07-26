import express from 'express';
import User from '../models/userModel';

const router = express.Router();

router.post('/login/google', async (req, res) => {
  try {
    let user = await User.find({
      email: req.body.email
    });
    console.log(user);
    if (user.length > 0) {
      res.json(user[0]);
    }
    user = await User.create(req.body);
    res.json(user);
  } catch (details) {
    res.status(500).json({
      error: 'Something went wrong!',
      details,
    });
  }
});

export default router;