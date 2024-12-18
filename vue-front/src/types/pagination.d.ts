export interface Pagination {
  currentPage: number | undefined
  hasNextPage: boolean | undefined
  hasPreviousPage: boolean | undefined
  pageSize: number | undefined
  totalCount: number | undefined
  totalPages: number | undefined
}
