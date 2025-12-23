import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import MetaController from './meta.controller';

const router = express.Router();

router.get(
    '/meta-data',
    auth(USER_ROLE.superAdmin),
    MetaController.getDashboardMetaData
);
router.get(
    '/normalUser-chart-data',
    auth(USER_ROLE.superAdmin),
    MetaController.getNormalUserChartData
);
router.get(
    '/organizer-chart-data',
    auth(USER_ROLE.superAdmin),
    MetaController.getOrganizerChartData
);

export const metaRoutes = router;
