import Provider from './provider.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';

const getAllProviders = async (query: Record<string, unknown>) => {
  // 1️⃣ PAGINATION SETUP
  // http://localhost:3333/api/v1/provider/all-providers?providerTypeId=null&status=active&page=1&limit=10
  // if providerTypeId is null then show all provider
  // status active ..is come from User.isBlocked
  // Extract page number from query or default to 1
  const page = Number(query.page) || 1;
  // Extract limit (items per page) from query or default to 10
  const limit = Number(query.limit) || 10;
  // Calculate how many documents to skip for pagination
  const skip = (page - 1) * limit;

  // Define which fields should be searchable
  const searchableFields = ['fullName', 'author', 'category'];

  // 2️⃣ BUILD INITIAL QUERY
  // Create QueryBuilder instance with Provider model and query parameters

  const queryBuilder = new QueryBuilder(Provider.find(), query)
    .search(searchableFields) // Add search functionality for specified fields
    .filter() // Apply filters from query params
    .sort(); // Apply sorting from query params
  if (query.providerTypeId) {
    queryBuilder.modelQuery.where({
      providerTypeId: new mongoose.Types.ObjectId(
        query.providerTypeId as string,
      ),
    });
  }
  // 3️⃣ EXTRACT MONGODB QUERY COMPONENTS
  // Get the filter conditions from the built query
  const filter = queryBuilder.modelQuery.getFilter();

  // Get sort options or default to descending creation date
  const sort = queryBuilder.modelQuery.getOptions()?.sort || { createdAt: -1 };

  // 4️⃣ AGGREGATION PIPELINE
  const aggregation = await Provider.aggregate([
    // Stage 1: Match documents based on filter conditions
    { $match: filter },

    // Stage 2: Sort documents
    { $sort: sort },

    // Stage 3: Join with ProviderType collection
    {
      $lookup: {
        from: 'providertypes', // Collection to join
        localField: 'providerTypeId', // Field from Provider document
        foreignField: '_id', // Field from ProviderType document
        as: 'providerType', // Output array field name
      },
    },

    // Stage 4: Convert providerType array to single object
    {
      $addFields: {
        providerType: { $arrayElemAt: ['$providerType', 0] }, // Extract first element
      },
    },

    // Stage 5: Join with Services collection (handling array of service IDs)
    {
      $lookup: {
        from: 'services', // Collection to join
        let: { serviceIds: '$serviceId' }, // Define variable for serviceId array
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  '$_id', // Match Service._id
                  {
                    $map: {
                      input: '$$serviceIds', // Process each serviceId
                      as: 'id',
                      in: { $toObjectId: '$$id' }, // Convert string ID to ObjectId
                    },
                  },
                ],
              },
            },
          },
        ],
        as: 'services', // Output array field name
      },
    },
    {
      $lookup: {
        from: 'availabilitydays',
        let: { providerId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$providerId', '$$providerId'] },
            },
          },
          {
            $lookup: {
              from: 'availabilityslots',
              localField: '_id',
              foreignField: 'availabilityDayId',
              as: 'availabilitySlots',
            },
          },
        ],
        as: 'availabilityDays',
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { providerId: { $toString: '$_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$profileId', '$$providerId'],
              },
            },
          },
          {
            $project: {
              password: 0,
              verifyEmailOTP: 0,
              verifyEmailOTPExpire: 0,
              isResetOTPVerified: 0,
              __v: 0,
            },
          },
        ],
        as: 'user',
      },
    },

    // Stage 6: Facet for pagination and counting
    {
      $facet: {
        // Data pipeline: Apply pagination to results
        data: [
          { $skip: skip }, // Skip documents for pagination
          { $limit: limit }, // Limit to page size
        ],
        // Total pipeline: Count total matching documents
        total: [
          { $count: 'count' }, // Count all documents after previous stages
        ],
      },
    },
  ]);

  // 5️⃣ EXTRACT RESULTS FROM AGGREGATION
  // Get total count from facet results, default to 0 if not found
  const total = aggregation[0]?.total[0]?.count || 0;
  // Calculate total number of pages
  const totalPage = Math.ceil(total / limit);

  // 6️⃣ RETURN FORMATTED RESPONSE
  return {
    meta: {
      page, // Current page number
      limit, // Items per page
      total, // Total matching documents
      totalPage, // Total pages available
    },
    data: aggregation[0]?.data || [], // Paginated data
  };
};

const getSingleProvider = async (id: string) => {
  const providerId = new mongoose.Types.ObjectId(id);

  const result = await Provider.aggregate([
    // 1️⃣ Match provider by ID
    {
      $match: { _id: providerId },
    },

    // 2️⃣ Provider Type
    {
      $lookup: {
        from: 'providertypes',
        localField: 'providerTypeId',
        foreignField: '_id',
        as: 'providerType',
      },
    },
    {
      $addFields: {
        providerType: { $arrayElemAt: ['$providerType', 0] },
      },
    },

    // 3️⃣ Services (string → ObjectId)
    {
      $lookup: {
        from: 'services',
        let: { serviceIds: '$serviceId' },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  '$_id',
                  {
                    $map: {
                      input: '$$serviceIds',
                      as: 'id',
                      in: { $toObjectId: '$$id' },
                    },
                  },
                ],
              },
            },
          },
        ],
        as: 'services',
      },
    },

    // 4️⃣ Availability Days + Slots
    {
      $lookup: {
        from: 'availabilitydays',
        let: { providerId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$providerId', '$$providerId'] },
            },
          },
          {
            $lookup: {
              from: 'availabilityslots',
              localField: '_id',
              foreignField: 'availabilityDayId',
              as: 'availabilitySlots',
            },
          },
        ],
        as: 'availabilityDays',
      },
    },

    // 5️⃣ USER LOOKUP (profileId === provider._id as string)
    {
      $lookup: {
        from: 'users',
        let: { providerId: { $toString: '$_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$profileId', '$$providerId'],
              },
            },
          },
          {
            $project: {
              password: 0,
              verifyEmailOTP: 0,
              verifyEmailOTPExpire: 0,
              isResetOTPVerified: 0,
              __v: 0,
            },
          },
        ],
        as: 'user',
      },
    },

    // 6️⃣ Convert user array → single object
    {
      $addFields: {
        user: { $arrayElemAt: ['$user', 0] },
      },
    },
  ]);

  return result[0] || null;
};
const ProviderServices = { getAllProviders, getSingleProvider };
export default ProviderServices;
