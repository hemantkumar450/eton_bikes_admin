export declare class ApiResponse<T> {
  type: string;
  code: number;
  message: string;
  count: number;
  totalRecords: number;
  token: string;
  data: T | null;
}
