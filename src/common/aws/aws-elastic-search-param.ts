export type IndexParam = {
    index: string;
    body: object;
    id?: string;
};

export type SearchParam = {
    index: string;
    query: object;
    sort?: object;
    size?: number;
    filterPath?: string[];
};

export type GetParam = {
    index: string;
    id: string;
};

export type UpdateParam = {
    index: string;
    body: object;
    id: string;
}

export type DeleteParam = {
    index: string;
    query: object;
};
