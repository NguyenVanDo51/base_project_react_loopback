export type UserType = {
  id?: string;
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  avatar?: string;
};

export type ProjectType = {
  id?: string;
  name?: string;
  created_by?: string;
  type?: string;
  key?: string;
  lead?: string;
  created_date?: Date;
};