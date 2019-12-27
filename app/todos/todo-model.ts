export type ApiResponse = Record<string, any>;

export interface ITodoModel extends ApiResponse {
  id: string;
  title: string;
  description: string;
  finished: boolean;
}
