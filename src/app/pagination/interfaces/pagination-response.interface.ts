export interface PaginationResponse {
  totalResults: number;
  limit: number;
  offset: number;
  params?: string;
  count: number;
  hasMore: boolean;
  partners: any[];
  forceSearchReset?: boolean;
}
