import {ArticleDto} from "@/api/Article/dto/Article.dto";
import {CommentDto} from "@/api/Article/dto/Comment.dto";
import {userDtoToUser} from "@/api/User/transform/fromDto";
import {ImageDto} from "@/api/Article/dto/Image.dto";
import {Image} from "@/domain/Image";
import {Comment} from "@/domain/Comment";
import {Article} from "@/domain/Article";
import api from "@/api/api";

export function articleDtoToArticle(dto: ArticleDto): Article {
    return {
        id: dto.id,
        title: dto.attributes.title,
        subTitle: dto.attributes.sub_title,
        text: dto.attributes.text,
        image: imageDtoToImage(dto.attributes.image.data),
        comments: dto.attributes.comments?.data.map(commentDtoToComment) || [],
        author: userDtoToUser(dto.attributes.author.data)
    }
}

export function imageDtoToImage(dto: ImageDto): Image {
    return {
        id: dto.id,
        url: `${api.host}${dto.attributes.url}`,
        width: dto.attributes.width,
        height: dto.attributes.height,
        caption: dto.attributes.caption
    }
}

export function commentDtoToComment(dto: CommentDto): Comment {
    return {
        id: dto.id,
        text: dto.attributes.text,
        author: userDtoToUser(dto.attributes.author.data),
        datetime: new Date(dto.attributes.createdAt)
    }
}