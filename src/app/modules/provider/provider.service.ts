import Provider from './provider.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllProviders = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchableFields = ['fullName', 'author', 'category'];

  const queryBuilder = new QueryBuilder(Provider.find(), query)
    .search(searchableFields)
    .filter()
    .sort();

  // Count AFTER filters
  const total = await Provider.countDocuments(
    queryBuilder.modelQuery.getFilter(),
  );

  const result = await queryBuilder.modelQuery.skip(skip).limit(limit).exec();

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
const ProviderServices = { getAllProviders };
export default ProviderServices;
