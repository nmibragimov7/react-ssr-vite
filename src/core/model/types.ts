export interface TodoProps {
    id: number;
    completed: boolean;
    title: string;
}
export const enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}
