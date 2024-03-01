import api from "@/api/api";
import {Article} from "@/domain/Article";
import {DateTimeString, Paginated, RequestWrapperForPlural} from "@/domain/Shared";
import {articleDtoToArticle} from "@/api/Article/transrorm/fromDto";
import {UserDto} from "@/api/User/dto/User.dto";
import {ImageDto} from "@/api/Article/dto/Image.dto";

type GetArticlesResponse = RequestWrapperForPlural<{
    title: string;
    text: string;
    sub_title: string;
    createdAt: DateTimeString;
    updatedAt: DateTimeString;
    publishedAt: DateTimeString;
    image: { data: ImageDto; };
    author: { data: UserDto; }
}>;

export function transformResponse(response: GetArticlesResponse) {
    return response.data.map(articleDtoToArticle);
}

export async function getArticles(): Promise<Paginated<Article> | null> {
    const response = await api.get<GetArticlesResponse>("/articles?populate[image]=true&populate[author]=true");
    if (response.data) {
        return {data: transformResponse(response), pagination: response.meta.pagination};
    }
    return null;
}