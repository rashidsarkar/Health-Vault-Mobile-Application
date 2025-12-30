import { StatusCodes } from 'http-status-codes';
import { IArticle } from './article.interface';
import Article from './article.model';
import AppError from '../../errors/AppError';
import unlinkFile from '../../utils/unLinkFile';

const createArticle = async (payload: IArticle) => {
  const result = await Article.create(payload);
  return result;
};

const getAllArticles = async () => {
  return await Article.find().sort({ createdAt: -1 });
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
