export default class UsersService {
    constructor(usuarioManager) {
      this.usuarioManager = usuarioManager;
    }
    getUsers = (params) => {
      return this.usuarioManager.getUsers(params);
    };
    getUserById = (params) => {
      return this.usuarioManager.getUserById(params)
    };
    createUser = (user) => {
      return this.usuarioManager.createUser(user);
    };
    updateUser = (id,user) => {
      return this.usuarioManager.updateUser(id, user);
    };
    deleteUser = (id) => {
      return this.usuarioManager.deleteUser(id);
    };
  }