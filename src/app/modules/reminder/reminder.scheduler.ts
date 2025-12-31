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
    console.log(
      `[${now.format()}] Cron triggered. Checking reminders for ${currentTime}`,
    );

    const reminders = await Reminder.find({
      isActive: true,
      startDate: { $lte: now.toDate() },
      endDate: { $gte: now.toDate() },
      times: { $in: [currentTime] },
    });

    console.log(`[${now.format()}] Found ${reminders.length} reminder(s)`);

    for (const reminder of reminders) {
      // 🚫 prevent duplicate push
      if (
        reminder.lastNotifiedAt &&
        dayjs(reminder.lastNotifiedAt).isSame(now, 'minute')
      ) {
        console.log(
          `[${now.format()}] Reminder ${reminder._id} already notified this minute`,
        );
        continue;
      }

      const user = await User.findOne({
        profileId: reminder.normalUserId.toString(),
      }).select('_id');

      if (!user) {
        console.log(
          `[${now.format()}] User not found for profileId: ${reminder.normalUserId}`,
        );
        continue;
      }

      console.log(
        `[${now.format()}] Sending notification for reminder ${reminder._id} to user ${user._id}`,
      );

      // 📲 PUSH NOTIFICATION ONLY
      await sendSinglePushNotification(
        user._id.toString(),
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
      console.log(`[${now.format()}] Reminder ${reminder._id} marked as sent`);
    }
  });
};

export default startReminderScheduler;
