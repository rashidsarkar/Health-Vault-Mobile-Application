import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { reminderRoutes } from '../modules/reminder/reminder.routes';
import { serviceRoutes } from '../modules/service/service.routes';
import { providerTypesRoutes } from '../modules/providerTypes/providerTypes.routes';
import { availabilityDayRoutes } from '../modules/availabilityDay/availabilityDay.routes';
import { availabilitySlotRoutes } from '../modules/availabilitySlot/availabilitySlot.routes';
import { providerRoutes } from '../modules/provider/provider.routes';
import { favoriteRoutes } from '../modules/favorite/favorite.routes';
import { appointmentRoutes } from '../modules/appointment/appointment.routes';

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
  {
    path: '/availability-day',
    route: availabilityDayRoutes,
  },
  {
    path: '/availability-slot',
    route: availabilitySlotRoutes,
  },
  {
    path: '/provider',
    route: providerRoutes,
  },
  {
    path: '/favorite',
    route: favoriteRoutes,
  },
  {
    path: '/appointment',
    route: appointmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
//TODO -  this is my main routes
