import User from '../models/userModel';

export default async function (req, res, next) {
  try {
    const currentUser = await User.find({
      accessToken: req.headers.authorization
    });
    if (currentUser.length > 0) {
      req.currentUser = currentUser[0];
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (details) {
    res.status(500).json({
      error: 'Something went wrong!',
      details,
    })
  }

}