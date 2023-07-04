import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  passwordChanging,
  registerUser,
  userLogin,
  userLogout,
} from "../controllers/users.js";

const router = Router();

router.get("/", getAllUser);
router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout/:id", userLogout);
router.post("/change_password/:id", passwordChanging);
router.delete("/remove/:id", deleteUser);

export default router;
