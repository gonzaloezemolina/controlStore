import userModel from "../dao/mongo/models/user.model.js";
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
    addToPurchaseHistory = async (userId, ticketId) => {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          userId,
          { $push: { purchaseHistory: ticketId } },
          { new: true } 
        );
  
        if (!updatedUser) {
          throw new Error('Usuario no encontrado');
        }
  
        return updatedUser.purchaseHistory;
      } catch (error) {
        throw new Error(`Error al agregar el ticket al historial de compras: ${error.message}`);
      }
    }
  }