import type { User } from './user';

export interface Blog {
  category: string;
  content: string;
  coverImg: string;
  createdAt: string;
  desc: string;
  id: string;
  isFeatured: boolean;
  slug: string;
  title: string;
  updatedAt: string;
  user: User;
  visitCount: number;
  __v: number;
  _id: string;
}
