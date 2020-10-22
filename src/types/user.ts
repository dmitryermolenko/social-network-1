export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends ICreateUser {
  userId: number;
  dateOfBirth?: string;
  education?: string;
  aboutMe?: string;
  avatar?: string;
  city?: string;
  linkSite?: string;
  profession?: string;
  roleName?: string;
  status?: string;
  activeName?: 'ACTIVE' | 'DISABLED';
}

export interface IUpdateInfoUser extends IUser {
  userId: number;
}

export interface IUpdateStatusUser {
  userId: number;
  status: string;
}

export interface IUpdatePasswordUser {
  password: string;
}

export interface IUserWithTerms extends ICreateUser {
  terms: boolean;
}

export interface IUserFriend {
  friendId: number;
  id: number;
  userId: number;
}
