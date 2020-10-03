import express from 'express';

// Routes
import mediaCategoryRoute from './category';
import mediaRoute from './media';

const router = express.Router();

// Use Routes
router.use(mediaCategoryRoute);
router.use(mediaRoute);

export default router;
