import { ApiResponseInterface } from '../interfaces/api-response.interface';

export function ApiResponse({
  statusCode,
  statusMessage,
  data,
}: ApiResponseInterface) {
  return {
    statusCode,
    statusMessage,
    data,
  };
}
