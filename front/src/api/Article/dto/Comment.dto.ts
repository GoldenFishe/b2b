import {DateTimeString} from "@/domain/Shared";
import {UserDto} from "@/api/User/dto/User.dto";

export type CommentDto = {
    id: number;
    attributes: {
        text: string;
        createdAt: DateTimeString;
        author: { data: UserDto };
    };
};