export interface IUser {
  userId?: any;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  education?: string;
  aboutMe?: string;
  avatar: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  city?: string;
  linkSite?: string;
  roleName?: string;
  status?: string;
  activeName?: string;
}

export interface IUserWithTerms extends IUser {
  terms: boolean;
}

export interface IUserFriend {
  friendId: number;
  id: number;
  userId: number;
}
