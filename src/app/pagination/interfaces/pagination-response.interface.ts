export interface PaginationResponse {
  totalResults: number;
  limit: number;
  offset: number;
  params?: string;
  count: number;
  hasMore: boolean;
  items: any[];
  forceSearchReset?: boolean;
}
