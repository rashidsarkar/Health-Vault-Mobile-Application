import { ENUM_EVENT_STATUS } from '../event/event.enum';
import { Event } from '../event/event.model';
import NormalUser from '../normalUser/normalUser.model';
import Organizer from '../organizer/organizer.model';

const getDashboardMetaData = async () => {
    const [totalNormalUser, totalOrganizer, activeEvent] = await Promise.all([
        NormalUser.countDocuments(),
        Organizer.countDocuments(),
        Event.countDocuments({
            status: {
                $ne: ENUM_EVENT_STATUS.EVENT_FINISHED,
            },
        }),
    ]);

    return {
        totalNormalUser,
        totalOrganizer,
        activeEvent,
    };
};

const getNormalUserChartData = async (year: number) => {
    const startOfYear = new Date(year, 0, 1);

    const endOfYear = new Date(year + 1, 0, 1);

    const chartData = await NormalUser.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfYear,
                    $lt: endOfYear,
                },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                totalUser: { $sum: 1 },
            },
        },
        {
            $project: {
                month: '$_id',
                totalUser: 1,
                _id: 0,
            },
        },
        {
            $sort: { month: 1 },
        },
    ]);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const data = Array.from({ length: 12 }, (_, index) => ({
        month: months[index],
        totalUser:
            chartData.find((item) => item.month === index + 1)?.totalUser || 0,
    }));

    const yearsResult = await NormalUser.aggregate([
        {
            $group: {
                _id: { $year: '$createdAt' },
            },
        },
        {
            $project: {
                year: '$_id',
                _id: 0,
            },
        },
        {
            $sort: { year: 1 },
        },
    ]);

    const yearsDropdown = yearsResult.map((item: any) => item.year);

    return {
        chartData: data,
        yearsDropdown,
    };
};

const getOrganizerChartData = async (year: number) => {
    const startOfYear = new Date(year, 0, 1);

    const endOfYear = new Date(year + 1, 0, 1);

    const chartData = await Organizer.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfYear,
                    $lt: endOfYear,
                },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                totalUser: { $sum: 1 },
            },
        },
        {
            $project: {
                month: '$_id',
                totalUser: 1,
                _id: 0,
            },
        },
        {
            $sort: { month: 1 },
        },
    ]);

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const data = Array.from({ length: 12 }, (_, index) => ({
        month: months[index],
        totalUser:
            chartData.find((item) => item.month === index + 1)?.totalUser || 0,
    }));

    const yearsResult = await Organizer.aggregate([
        {
            $group: {
                _id: { $year: '$createdAt' },
            },
        },
        {
            $project: {
                year: '$_id',
                _id: 0,
            },
        },
        {
            $sort: { year: 1 },
        },
    ]);

    const yearsDropdown = yearsResult.map((item: any) => item.year);

    return {
        chartData: data,
        yearsDropdown,
    };
};
const MetaService = {
    getDashboardMetaData,
    getNormalUserChartData,
    getOrganizerChartData,
};

export default MetaService;
