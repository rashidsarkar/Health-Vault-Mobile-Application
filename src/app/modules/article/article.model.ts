import { model, Schema } from 'mongoose';
import { IArticle } from './article.interface';

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    article_image: { type: String },
  },
  { timestamps: true },
);

const Article = model<IArticle>('Article', articleSchema);
export default Article;
