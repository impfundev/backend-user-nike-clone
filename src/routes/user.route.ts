import express from "express";
import { verify } from "../middlewares/verifytoken.middleware";
import {
  register,
  login,
  session,
  logout,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/single/:id", verify, singleUser);
router.get("/all", verify, allUsers);
router.get("/session", verify, session);

router.put("/update/:id", verify, updateUser);
router.delete("/delete/:id", verify, deleteUser);

export default router;
