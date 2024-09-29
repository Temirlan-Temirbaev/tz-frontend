export type ErrorResponse = {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    }
  }
}