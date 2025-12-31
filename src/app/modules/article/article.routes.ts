import express from 'express';
import { uploadFile } from '../../utils/fileUploader';
import ArticleController from './article.controller';
import validateRequest from '../../middlewares/validateRequest';
import ArticleValidations from './article.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.ADMIN),
  uploadFile(),
  (req, _res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(ArticleValidations.createArticleValidationSchema),
  ArticleController.createArticle,
);

router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getSingleArticle);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  uploadFile(),
  (req, _res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(ArticleValidations.updateArticleValidationSchema),

  ArticleController.updateArticle,
);

router.delete('/:id', auth(USER_ROLE.ADMIN), ArticleController.deleteArticle);
export const articleRoutes = router;
