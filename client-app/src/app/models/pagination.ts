export interface Pagination{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T>{
    data: T;
    pagination: Pagination;

    //when we create a new instance of this class we need the pass the data and the pagination. And then we have a PaginatedResult of type T which is going to be ActivitiesArray
    constructor(data:T, pagination: Pagination) {
        this.data=data;
        this.pagination=pagination;
    }
}

export class PagingParams {
    pageNumber;
    pageSize;

    constructor(pageNumber=1,pageSize=2 ) {
        this.pageNumber=pageNumber;
        this.pageSize=pageSize;
    }
}