export interface MockResponse<T> {
  status: number;
  data: T;
  headers: {
    'Content-Type': string;
  };
}

export const mockResponse = <T>(status: number, data: T): MockResponse<T> => {
  return {
    status,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
