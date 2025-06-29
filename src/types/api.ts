export interface CustomError extends Error {
  response?: {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  };
}
