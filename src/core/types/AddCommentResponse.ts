import { number, object, string } from "yup";

export interface AddCommentResponse {
  body: {
    email: string;
    name: string;
    body: string;
  };
  postId: string;
  id: number;
}

export const schema = object({
  body: object({
    email: string().email().required(),
    name: string().required(),
    body: string().required(),
  }),
  postId: string().required(),
  id: number().required(),
});

export const isAddCommentResponse = (
  value: unknown
): value is AddCommentResponse => schema.isValidSync(value);
