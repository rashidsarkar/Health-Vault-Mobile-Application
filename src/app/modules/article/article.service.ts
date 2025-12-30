import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IArticle } from "./article.interface";
import Article from "./article.model";

const updateUserProfile = async (id: string, payload: Partial<IArticle>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await Article.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await Article.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const ArticleServices = { updateUserProfile };
export default ArticleServices;