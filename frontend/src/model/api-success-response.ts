export interface ApiSuccessResponse<T> {
  statusCode: number;
  statusMessage: string;
  data: T;
}
