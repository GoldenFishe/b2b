import {User} from "@/domain/User";

export interface Comment {
    id: number;
    text: string;
    author: User;
    datetime: Date;
}