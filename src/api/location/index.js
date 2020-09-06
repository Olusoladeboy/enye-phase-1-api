import express from 'express';

// Routes
import cityRoute from './city';
import countyRoute from './county';
import stateRoute from './state';

const router = express.Router();

// Use Routes
router.use(cityRoute);
router.use(countyRoute);
router.use(stateRoute);

export default router;
