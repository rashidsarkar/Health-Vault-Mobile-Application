import { z } from 'zod';

const createArticleValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, 'Title cannot be empty'),

    details: z
      .string({
        required_error: 'Details are required',
      })
      .min(1, 'Details cannot be empty'),

    article_image: z.string(),
  }),
});

const updateArticleValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    details: z.string().optional(),
    article_image: z.string().optional(),
  }),
});

const ArticleValidations = {
  createArticleValidationSchema,
  updateArticleValidationSchema,
};

export default ArticleValidations;
