import {DateTimeString} from "@/domain/Shared";
import {ImageDto} from "@/api/Article/dto/Image.dto";
import {CommentDto} from "@/api/Article/dto/Comment.dto";
import {UserDto} from "@/api/User/dto/User.dto";

export type ArticleDto = {
    id: number;
    attributes: {
        title: string;
        text: string;
        sub_title: string;
        createdAt: DateTimeString;
        updatedAt: DateTimeString;
        publishedAt: DateTimeString;
        image: { data: ImageDto; };
        comments?: { data: Array<CommentDto> };
        author: { data: UserDto; };
    }
}