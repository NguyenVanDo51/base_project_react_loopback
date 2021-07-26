import projectController from '../controllers/projectController';
import express from 'express';
import auth from '../middlewares/auth';
import userController from '../controllers/userController';

let router = express.Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

router.use('/users', userController);
router.use('/projects', auth, projectController);

// Export API routes
export default router;