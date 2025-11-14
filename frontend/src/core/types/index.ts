/**
 * @module CoreTypes
 * @summary Global type definitions for the application
 */

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
