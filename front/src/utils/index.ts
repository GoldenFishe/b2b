import {cookies} from "next/headers";

import {User} from "@/domain/User";

export class AuthManager {
    // Статический класс. Запрещаем создавать объект
    private constructor() {}

    static set accessToken(accessToken: string) {
        cookies().set('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });
    }

    static get accessToken(): string | undefined {
        return cookies().get('access_token')?.value;
    }

    static get authorized() {
        return Boolean(cookies().get('access_token')?.value);
    }

    static get userId(): User["id"] | undefined {
        const id = cookies().get('userId')?.value;
        return id ? Number(id) : undefined;
    }

    static set userId(id: number) {
        cookies().set('userId', id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });
    }
}