import { ApiResponseInterface } from '../interfaces/api-response.interface';

export function ApiResponse({
  statusCode,
  message,
  data,
}: ApiResponseInterface) {
  return {
    statusCode,
    message,
    data,
  };
}
