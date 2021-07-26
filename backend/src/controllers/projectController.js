import { body, validationResult } from 'express-validator';
import express from 'express';
import Project from '../models/projectModel';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.currentUser._id
    })
    res.status(200).json(projects);
  } catch (details) {
    res.status(500).json({
      error: 'Something went wrong!',
      details,
    });
  }
});

router.post('/', body('name').isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log({
      name: req.body.name,
      createdBy: req.currentUser
    });
    const project = await Project.create({
      name: req.body.name,
      createdBy: req.currentUser._id
    });
    res.status(200).json(project);
  } catch (details) {
    res.status(500).json({
      error: 'Something went wrong!',
      details,
    });
  }
})

export default router;