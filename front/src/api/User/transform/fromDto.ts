import {UserDto} from "@/api/User/dto/User.dto";
import {User} from "@/domain/User";

export function userDtoToUser(userDto: UserDto): User {
    return {
        id: userDto.id,
        username: userDto.attributes.username,
        email: userDto.attributes.email,
    }
}