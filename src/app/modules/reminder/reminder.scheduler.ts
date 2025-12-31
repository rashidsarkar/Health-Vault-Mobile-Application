import cron from 'node-cron';
import dayjs from 'dayjs';

import { sendSinglePushNotification } from '../../helper/sendPushNotification';
import Reminder from './reminder.model';
import { User } from '../user/user.model';

const startReminderScheduler = () => {
  // runs every minute
  cron.schedule('* * * * *', async () => {
    const now = dayjs();
    const currentTime = now.format('HH:mm');

    const reminders = await Reminder.find({
      isActive: true,
      startDate: { $lte: now.toDate() },
      endDate: { $gte: now.toDate() },
      times: currentTime,
    });

    for (const reminder of reminders) {
      // 🚫 prevent duplicate push
      if (
        reminder.lastNotifiedAt &&
        dayjs(reminder.lastNotifiedAt).isSame(now, 'minute')
      ) {
        continue;
      }

      const user = await User.findOne({
        profileId: reminder.normalUserId.toString(),
      }).select('_id');

      if (!user) {
        console.log('User not found for profileId');
        return;
      }

      // 📲 PUSH NOTIFICATION ONLY
      await sendSinglePushNotification(
        user._id.toString(), // ✅ correct userId
        'Medicine Reminder',
        `Time to take ${reminder.pillName} (${reminder.dosage}mg). ${reminder.instructions ?? ''}`,
        {
          reminderId: reminder._id.toString(),
          pillName: reminder.pillName,
          dosage: reminder.dosage,
        },
      );

      // ✅ mark as sent
      reminder.lastNotifiedAt = now.toDate();
      await reminder.save();
    }
  });
};

export default startReminderScheduler;
