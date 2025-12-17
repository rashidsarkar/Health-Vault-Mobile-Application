import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /* -------------------- SEARCH -------------------- */
  search(searchableFields: string[]) {
    const search = this.query?.search as string;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  /* -------------------- FILTER -------------------- */
  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['search', 'sortBy', 'sortOrder', 'page', 'limit'];

    excludeFields.forEach((key) => delete queryObj[key]);

    if (Object.keys(queryObj).length > 0) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  /* -------------------- SORT -------------------- */
  sort() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder as string;

    if (sortBy) {
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortStr);
    }

    return this;
  }
}

export default QueryBuilder;
