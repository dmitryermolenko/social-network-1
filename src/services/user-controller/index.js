import { getCurrentUser, getAsyncCurrentUser } from './mock-user-controller';
import {
  getUserById,
  getAllUsers,
  createNewUser,
  removeUserById,
  getFriendsByUserId,
  updateUser,
  updateUserStatus,
} from './user-controller';

export {
  getUserById,
  getCurrentUser,
  getAllUsers,
  createNewUser,
  removeUserById,
  getFriendsByUserId,
  updateUser,
  updateUserStatus,
  getAsyncCurrentUser,
};
