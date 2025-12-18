import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import appointmentServices from './appointment.service';

const createAppointment = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'appointment_images' in files) {
    req.body.appointment_images = files['appointment_images'][0].path;
  }

  const result = await appointmentServices.createAppointment(
    req.body,
    req.user.profileId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Appointment created successfully',
    data: result,
  });
});

const getMyAppointments = catchAsync(async (req, res) => {
  const result = await appointmentServices.getMyAppointments(
    req.user.profileId,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Appointments fetched successfully',
    data: result,
  });
});

const AppointmentController = { createAppointment, getMyAppointments };
export default AppointmentController;
