import api from "@/api/api";
import {User} from "@/domain/User";
import {userDtoToUser} from "@/api/User/transform/fromDto";

type Success = {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    }
};
type Error = { data: null, error: { status: 400 } }

type SignInDataResponse = Success | Error;

function transformResponse(response: Success) {
    const user = userDtoToUser({
        id: response.user.id,
        attributes: {username: response.user.username, email: response.user.email}
    });
    return {...user, jwt: response.jwt};
}

type Body = { identifier: string, password: string };

export async function signIn({login, password}: { login: string, password: string }): Promise<User & {
    jwt: string;
} | null> {
    const response = await api.post<Body, SignInDataResponse>("/auth/local", {identifier: login, password: password});
    if ("error" in response && response.error.status === 400) {
        return null;
    }
    return transformResponse(response as Success);
}