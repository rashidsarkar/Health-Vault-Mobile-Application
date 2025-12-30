import { z } from "zod";

export const updateArticleData = z.object({
    body: z.object({
        name: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
    }),
});

const ArticleValidations = { updateArticleData };
export default ArticleValidations;