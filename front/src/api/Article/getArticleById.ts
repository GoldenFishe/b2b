import {Article} from "@/domain/Article";
import api from "@/api/api";
import {DateTimeString, RequestWrapperForSingular} from "@/domain/Shared";
import {articleDtoToArticle} from "@/api/Article/transrorm/fromDto";
import {CommentDto} from "@/api/Article/dto/Comment.dto";
import {UserDto} from "@/api/User/dto/User.dto";
import {ImageDto} from "@/api/Article/dto/Image.dto";

type GetArticleByIdResponse = RequestWrapperForSingular<{
    title: string;
    text: string;
    sub_title: string;
    createdAt: DateTimeString;
    updatedAt: DateTimeString;
    publishedAt: DateTimeString;
    image: { data: ImageDto };
    comments: { data: Array<CommentDto> };
    author: { data: UserDto }
}>;

export function transformResponse(response: GetArticleByIdResponse) {
    return articleDtoToArticle(response.data!);
}

export async function getArticleById(id: string): Promise<Article | null> {
    const response = await api.get<GetArticleByIdResponse>(`/articles/${id}?populate[comments][populate][0]=author&populate[author]=true&populate[image]=true`);
    if (response.data) {
        return transformResponse(response);
    }
    return null;
}