export type RequestWrapperForPlural<T> = {
    data: Array<{ id: number; attributes: T }>;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        }
    };
}

export type RequestWrapperForSingular<T> = {
    data: { id: number; attributes: T };
    meta: {};
} | { data: null; error?: { status: 404 } }

export type DateTimeString = string; // "2024-02-27T14:59:06.399Z"

export type Paginated<T> = {
    data: Array<T>;
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    }
} | { data: null; error?: { status: 404 } }