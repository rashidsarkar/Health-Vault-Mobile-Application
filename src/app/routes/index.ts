import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { reminderRoutes } from '../modules/reminder/reminder.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { providerTypesRoutes } from '../modules/providerTypes/providerTypes.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/reminder',
    route: reminderRoutes,
  },
  {
    path: '/service',
    route: serviceRoutes,
  },
  {
    path: '/provider-types',
    route: providerTypesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
//TODO -  this is my main routes
