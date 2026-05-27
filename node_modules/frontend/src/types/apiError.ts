import type { AxiosError } from "axios";

export type ApiError = AxiosError<{
  error: string;
  response: {
    message: string;
    validation: { body: { message: string } };
  };
}>;
