import {Comment} from "@/domain/Comment";
import {User} from "@/domain/User";
import {Image} from "@/domain/Image";

export interface Article {
    id: number;
    title: string;
    subTitle: string;
    text: string;
    image: Image;
    comments: Comment[];
    author: User;
}