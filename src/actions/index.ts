import { registerUser } from './auth/registerUser';
import { getUsersAction } from './users/getUsers';
import { updateUserLike } from './users/updateUserLike';

export const server = {
  getUsersAction,
  updateUserLike,
  registerUser
};
