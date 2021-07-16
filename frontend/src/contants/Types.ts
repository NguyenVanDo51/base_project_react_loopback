export type UserType = {
  id: string;
  email: string;
  name: string;
};

export type ProjectType = {
  id?: string;
  name?: string;
  user_id?: string;
  type?: string;
  created_date?: Date;
  isDeleted?: 0 | 1;
  color?: string;
};