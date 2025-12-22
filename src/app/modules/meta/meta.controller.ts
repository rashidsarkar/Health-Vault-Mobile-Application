import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import MetaService from './meta.service';

const getDashboardMetaData = catchAsync(async (req, res) => {
    const result = await MetaService.getDashboardMetaData();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard meta data retrieved successfully',
        data: result,
    });
});

const getNormalUserChartData = catchAsync(async (req, res) => {
    const result = await MetaService.getNormalUserChartData(
        Number(req?.query.year)
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Normal User chart data retrieved successfully',
        data: result,
    });
});
const getOrganizerChartData = catchAsync(async (req, res) => {
    const result = await MetaService.getOrganizerChartData(
        Number(req?.query.year)
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Organizer chart data retrieved successfully',
        data: result,
    });
});

const MetaController = {
    getDashboardMetaData,
    getNormalUserChartData,
    getOrganizerChartData,
};

export default MetaController;
