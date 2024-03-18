import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  patchIsBiz,
} from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import { generateToken } from "../token/jwt.js";


const getAllUsersController = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};
const registerController = async (req, res) => {

  try {
    let userFromDB = await getUserByEmail(req.body.email);

    if (userFromDB) throw new Error("user already exists");
    let passwordHash = await generateHash(req.body.password);

    req.body.password = passwordHash;

    let newUser = await createUser(req.body);
    newUser.password = undefined;
    delete newUser.password;
    console.log(newUser);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const loginController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (!userFromDB) throw new Error("invalid email or password*");
    let passwordMatch = await cmpHash(req.body.password, userFromDB.password);
    if (!passwordMatch) throw new Error("invalid email or password**");
    let token = await generateToken({
      _id: userFromDB._id,
      isAdmin: userFromDB.isAdmin,
      isBusiness: userFromDB.isBusiness,
    });
    res.json(token);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const updateUserController = async (req, res) => {

  try {
    let userFromDB = await updateUser(req.params.id, req.body);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let userFromDB = await patchIsBiz(req.params.id, req.body.isBusiness);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDB = await deleteUser(req.params.id);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

export {
  getAllUsersController,
  loginController,
  registerController,
  updateUserController,
  deleteUserController,
  patchIsBizController,
};
