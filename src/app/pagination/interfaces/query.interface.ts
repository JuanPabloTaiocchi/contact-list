export interface Query{
    refresh?: boolean;
    offset: number;
    limit: number;
    url: string;
    httpBodyParameters: any;
}
