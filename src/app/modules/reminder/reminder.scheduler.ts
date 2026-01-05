import cron from 'node-cron';
import dayjs from 'dayjs';

import { sendSinglePushNotification } from '../../helper/sendPushNotification';
import Reminder from './reminder.model';
import { User } from '../user/user.model';
import { ReminderSchedule } from './reminder.interface';

const startReminderScheduler = () => {
  // ⏰ runs every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = dayjs();
      const currentTime = now.format('HH:mm');

      const todayDay = now.day(); // 0 = Sunday ... 6 = Saturday
      const todayDate = now.date(); // 1–31

      console.log(`[${now.format()}] Checking reminders for ${currentTime}`);

      const reminders = await Reminder.find({
        isActive: true,
        startDate: { $lte: now.toDate() },
        endDate: { $gte: now.toDate() },
        times: { $in: [currentTime] },
        $or: [
          // ✅ Daily
          { schedule: ReminderSchedule.Daily },

          // ✅ Weekly
          {
            schedule: ReminderSchedule.Weekly,
            'scheduleMeta.dayOfWeek': todayDay,
          },

          // ✅ Monthly
          {
            schedule: ReminderSchedule.Monthly,
            'scheduleMeta.dayOfMonth': todayDate,
          },
        ],
      });

      console.log(`[${now.format()}] Found ${reminders.length} reminder(s)`);

      for (const reminder of reminders) {
        // 🚫 prevent duplicate push (same minute)
        if (
          reminder.lastNotifiedAt &&
          dayjs(reminder.lastNotifiedAt).isSame(now, 'minute')
        ) {
          continue;
        }

        const user = await User.findOne({
          profileId: reminder.normalUserId.toString(),
        }).select('_id');

        if (!user) continue;

        // 📲 Send Push Notification
        await sendSinglePushNotification(
          user._id.toString(),
          'Medicine Reminder',
          `Time to take ${reminder.pillName} (${reminder.dosage}mg). ${
            reminder.instructions ?? ''
          }`,
          {
            reminderId: reminder._id.toString(),
            pillName: reminder.pillName,
            dosage: reminder.dosage,
            schedule: reminder.schedule,
          },
        );

        // ✅ Mark as notified
        reminder.lastNotifiedAt = now.toDate();
        await reminder.save();
      }
    } catch (error) {
      console.error('Reminder cron error:', error);
    }
  });
};

export default startReminderScheduler;
