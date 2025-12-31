import { StatusCodes } from 'http-status-codes';
import { IArticle } from './article.interface';
import Article from './article.model';
import AppError from '../../errors/AppError';
import unlinkFile from '../../utils/unLinkFile';

const createArticle = async (payload: IArticle) => {
  const result = await Article.create(payload);
  return result;
};

const getAllArticles = async (query: Record<string, unknown>) => {
  // 1️⃣ Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  // 2️⃣ Optional filter (extend later if needed)
  const filter = {};

  // 3️⃣ Total count
  const total = await Article.countDocuments(filter);
  const totalPage = Math.ceil(total / limit);

  // 4️⃣ Paginated data
  const articles = await Article.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // 5️⃣ Final response
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: articles,
  };
};

const getSingleArticle = async (id: string) => {
  const article = await Article.findById(id);
  if (!article) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Article not found');
  }
  return article;
};

const updateArticle = async (id: string, payload: Partial<IArticle>) => {
  const existingArticle = await Article.findById(id);

  if (!existingArticle) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Article not found');
  }

  // 🔥 remove old image if new image uploaded
  if (existingArticle.article_image && payload.article_image) {
    unlinkFile(existingArticle.article_image);
  }

  const updated = await Article.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updated;
};

const deleteArticle = async (id: string) => {
  const article = await Article.findById(id);

  if (!article) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Article not found');
  }

  if (article.article_image) {
    unlinkFile(article.article_image);
  }

  const result = await Article.findByIdAndDelete(id);
  return result;
};

const ArticleServices = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};

export default ArticleServices;
