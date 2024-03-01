import {AuthManager} from "@/utils";

type Params<Body> = {
    method: "GET" | "POST";
    body?: Body;
}

export class Api {
    public readonly host: string;
    private readonly prefix: string;

    constructor(host: string) {
        if (!host) {
            throw new Error("Missing host environment variable");
        }
        this.host = host;
        this.prefix = "api";
    }

    public get<Response>(url: string, authorized: boolean = false): Promise<Response> {
        return this.request<Response>(url, {method: "GET"}, authorized);
    }

    public post<Body, Response>(url: string, body: Body, authorized: boolean = false): Promise<Response> {
        return this.request<Response, Body>(url, {method: "POST", body}, authorized);
    }

    private request<Response, Body = void>(url: string, params: Params<Body>, authorized: boolean): Promise<Response> {
        return fetch(
            `${this.uri}${url}`,
            {
                method: params.method,
                body: JSON.stringify(params.body),
                headers: this.getHeaders(authorized)
            })
            .then(res => res.json())
    }

    private getHeaders(authorized: boolean) {
        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        if (authorized) headers.set('Authorization', `Bearer ${AuthManager.accessToken}`);
        return headers;
    }

    private get uri() {
        return `${this.host}/${this.prefix}`;
    }
}

if (!process.env.API) throw new Error("Missing host environment variable");

export default new Api(process.env.API);