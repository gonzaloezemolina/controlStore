import { UserService } from "../services/index.js";
//GetAll
const getUsers = async (req, res) => {
  const users = await UserService.getUsers();
  res.send({ status: "success", payload: users });
};
//GetById
const getUserById = async (req, res) => {
  const { uid } = req.params;
  const user = await UserService.getUserById({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  res.send({ status: "success", payload: user });
};
//Create
const createUser = async (req, res) => {
  const result = await UserService.createUser();
  res.send({ status: "success", payload: result._id });
};
//Update
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const user = await UserService.getUserById({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  const result = await UserService.updateUser(uid, req.body);
  res.send({ status: "success", payload: result });
};
//Delete
const deleteUser = async (req, res) => {
  const { uid } = req.params;
  const user = await UserService.getUserById({ _id: uid });
  if (!user)
    return res.status(404).send({ status: "error", message: "User not found" });
  await UserService.deleteUser(uid);
  res.send({ status: "success", message: "User deleted successfully" });
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};