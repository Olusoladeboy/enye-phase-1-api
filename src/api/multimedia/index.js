import express from 'express';

// Routes
import categoryRoute from './category';
import mediaRoute from './media';

const router = express.Router();

// Use Routes
router.use(categoryRoute);
router.use(mediaRoute);

export default router;
