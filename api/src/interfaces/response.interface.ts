export interface IResponse<T> {
  status: Number;
  data: T;
  message: string;
}
