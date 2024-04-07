import express from "express";
import { updateUser,   deleteUser, getSingleUser,getAllUser} from "../Controllers/userController.js";


const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;