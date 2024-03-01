import {Article} from "@/domain/Article";
import {User} from "@/domain/User";
import {AuthManager} from "@/utils";
import api from "@/api/api";

type CommentDto = {
    data: {
        text: string;
        createDatetime: string;
        article: Article["id"];
        author: User["id"];
    }
}

type Params = {
    text: string;
    articleId: Article["id"];
}

export function transformRequest(params: Params): CommentDto {
    if (AuthManager.userId) {
        return {
            data: {
                text: params.text,
                createDatetime: new Date().toISOString(),
                article: params.articleId,
                author: AuthManager.userId
            }
        }
    }
    throw new Error("Only authorized user is able to create a comment");
}

export function createComment(params: Params): Promise<void> {
    const body = transformRequest(params);
    return api.post<CommentDto, void>("/comments", body, true);
}