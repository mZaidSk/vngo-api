export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  statusCode?: number;
}

export function successResponse<T>(
  message: string,
  data?: T,
  statusCode = 200,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
}

export function errorResponse(
  message: string,
  error: any = null,
  statusCode = 400,
): ApiResponse {
  return {
    success: false,
    message,
    error,
    statusCode,
  };
}
