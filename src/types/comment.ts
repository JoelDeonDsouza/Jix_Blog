import type { User } from './user';

export interface Comment {
  _id: string;
  user: User;
  desc: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  desc: string;
  clerkUserId: string;
  blogId?: string;
}

export interface CreateCommentResponse {
  success: boolean;
  data: Comment;
  message: string;
}

export interface CommentTagProps {
  comment: Comment;
}
