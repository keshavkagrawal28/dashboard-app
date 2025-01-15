import { dataUser } from './data';

export const getUserById = (id) => dataUser.find((user) => user._id === id);
