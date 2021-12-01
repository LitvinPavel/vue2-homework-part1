import users from '../users.json';

export default {
  getList: async () => {
    return await users;
  }
}