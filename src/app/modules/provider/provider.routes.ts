import express from 'express';
import providerController from './provider.controller';

const router = express.Router();

router.get('/all-providers', providerController.getAllProviders);
router.get('/:id', providerController.getSingleProvider);

export const providerRoutes = router;
