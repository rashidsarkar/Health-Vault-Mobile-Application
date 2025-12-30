import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ArticleServices from './article.service';

const createArticle = catchAsync(async (req, res) => {
  const { files } = req;

  if (files && typeof files === 'object' && 'article_image' in files) {
    req.body.article_image = files['article_image'][0].path;
  }

  const result = await ArticleServices.createArticle(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Article created successfully',
    data: result,
  });
});

const getAllArticles = catchAsync(async (req, res) => {
  const result = await ArticleServices.getAllArticles();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Articles retrieved successfully',
    data: result,
  });
});

const getSingleArticle = catchAsync(async (req, res) => {
  const result = await ArticleServices.getSingleArticle(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Article retrieved successfully',
    data: result,
  });
});

const updateArticle = catchAsync(async (req, res) => {
  const { files } = req;

  if (files && typeof files === 'object' && 'article_image' in files) {
    req.body.article_image = files['article_image'][0].path;
  }

  const result = await ArticleServices.updateArticle(req.params.id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Article updated successfully',
    data: result,
  });
});

const deleteArticle = catchAsync(async (req, res) => {
  await ArticleServices.deleteArticle(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Article deleted successfully',
    data: null,
  });
});

const ArticleController = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};

export default ArticleController;
