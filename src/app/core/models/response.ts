export interface Response {
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message: string;
    erros: any;
    data: any;
    totalItems: number;
}

